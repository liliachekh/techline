const { PDFDocument, StandardFonts, rgb } = require("pdf-lib")
const fs = require("fs-extra");
const { readFile, writeFile } = require("fs/promises")
const { 
  staticInvoiceFields,
  dynamicInvoiceFields,
  productInvoiceFields,
  totalTableFields,
  deliveryTableFields,
  paymentTableFields,
  discountTableFields } = require("./invoiceFields");
const { log } = require("console");


const date = new Date()
const formatData = (input) => {
  if (input > 9) {
    return input;
  } else return `0${input}`;
};
const format = {
  dd: formatData(date.getDate()),
  mm: formatData(date.getMonth() + 1),
  yyyy: date.getFullYear()
}
const formatDate = `${format.dd}.${format.mm}.${format.yyyy}`

function addNewPage(pdfDoc, timesRomanFont) {
  const newPage = pdfDoc.addPage();
  newPage.setFontSize(12);
  newPage.setFont(timesRomanFont);
  return newPage;
}

module.exports = async function createPdf(output, order, customer) {
  try {
    const pdfData = await fs.readFile("static/invoices/Letterhead.pdf");
    const pdfDoc = await PDFDocument.create()
    const [letterHead] = await pdfDoc.embedPdf(pdfData)
    let page = pdfDoc.addPage()
    const { width, height } = page.getSize()
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

    page.drawPage(letterHead, { x: 0, y: 0 })
    page.setFontSize(12)
    page.setFont(timesRomanFont)
    const fontSize = 12

    let verticalPosition = 31
    let cartQuantity = 0;

    staticInvoiceFields(height, fontSize, formatDate, order, customer, cartQuantity).forEach(field => {
      if (field.type === "text") {
        return page.drawText(field.text, { ...field })
      }
      if (field.type === "rectangle") {
        return page.drawRectangle({ ...field })
      }
    })

    order.products.forEach((product) => {
      const amount = product.product.currentPrice * product.cartQuantity
      productInvoiceFields(height, fontSize, verticalPosition, product, amount, timesRomanFont).forEach(field => {
        if (field.type === "text-product") {
          return page.drawText(field.text, { ...field })
        }
        if (field.type === "rectangle-product") {
          return page.drawRectangle({ ...field })
        }
      })
      if (verticalPosition > 55) {
        verticalPosition = 4;
        page = addNewPage(pdfDoc, timesRomanFont);
      } else {
        verticalPosition += 2.5;
      }
      cartQuantity += product.cartQuantity
    })

    let paymentFee = 0;
  if (order.paymentInfo === "CARD") {
    paymentFee = (order.totalSum/1.017 * 0.017).toFixed(2);
    paymentTableFields(height, fontSize, paymentFee, verticalPosition).forEach(field => {
      if (field.type === "text-dynamic") {
        return page.drawText(field.text, { ...field })
      }
      if (field.type === "rectangle-dynamic") {
        return page.drawRectangle({ ...field })
      }
    })
    verticalPosition += 2
  }

if (order.deliveryPrice > 0) {
  deliveryTableFields (height, fontSize, order, verticalPosition).forEach(field => {
    if (field.type === "text-dynamic") {
      return page.drawText(field.text, { ...field })
    }
    if (field.type === "rectangle-dynamic") {
      return page.drawRectangle({ ...field })
    }
  })
  verticalPosition += 2
}

if (order.discount){
discountTableFields (height, fontSize, order, verticalPosition).forEach(field => {
  if (field.type === "text-dynamic") {
    return page.drawText(field.text, { ...field })
  }
  if (field.type === "rectangle-dynamic") {
    return page.drawRectangle({ ...field })
  }
})
verticalPosition += 2
}

    totalTableFields (height, fontSize, order, cartQuantity, verticalPosition).forEach(field => {
      if (field.type === "text-dynamic") {
        return page.drawText(field.text, { ...field })
      }
      if (field.type === "rectangle-dynamic") {
        return page.drawRectangle({ ...field })
      }
    })
    if (verticalPosition >= 45) {
      verticalPosition = 0
      page = addNewPage(pdfDoc, timesRomanFont);
    }
   
    if (verticalPosition < 45) {
      dynamicInvoiceFields(height, fontSize, order, customer, verticalPosition).forEach(field => {
        if (field.type === "text-dynamic") {
          return page.drawText(field.text, { ...field });
        }
        if (field.type === "rectangle-dynamic") {
          return page.drawRectangle({ ...field });
        }
      });
    }
   
    const pdfBytes = await pdfDoc.save()

    await writeFile(output, pdfBytes)
    console.log("PDF created");
  } catch (error) {
    console.error("Error reading the file:", error);
  }
}
