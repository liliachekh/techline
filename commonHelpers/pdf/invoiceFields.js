const { PDFDocument, StandardFonts, rgb } = require("pdf-lib")

const wrapText = (text, width, font, fontSize) => {
  const words = text.split(' ');
  let line = '';
  let result = '';
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const testWidth = font.widthOfTextAtSize(testLine, fontSize);
    if (testWidth > width) {
      result += line + '\n';
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }
  result += line;
  return result;
}

 function staticInvoiceFields(height, fontSize, formatDate, order, customer){
  return [
    {
      type: "text",
      text: "ALC ZOOM, S.L.",
      x: 50,
      y: height - 15 * fontSize,
    },
    {
      type: "text",
      text: "C. BALADRE, No. 6, Bl. 3, ESC. 3",
      x: 50,
      y: height - 16 * fontSize,
    },
    {
      type: "text",
      text: "PISO 1, PUERTA 396",
      x: 50,
      y: height - 17 * fontSize,
    },
    {
      type: "text",
      text: "03570 LA VILLAJOYOSA",
      x: 50,
      y: height - 18 * fontSize,
    },
    {
      type: "text",
      text: "CIF ESB72884349",
      x: 50,
      y: height - 19 * fontSize,
    },
    {
      type: "text",
      text: `Date: ${formatDate}`,
      x: 445,
      y: height - 17 * fontSize,
    },
    {
      type: "text",
      text: "N.o Proforma Invoice",
      x: 445,
      y: height - 18 * fontSize,
    },
    {
      type: "text",
      text: `${order.orderNo}`,
      x: 445,
      y: height - 19 * fontSize,
    },
    {
      type: "text",
      text: "The payer:",
      x: 50,
      y: height - 21 * fontSize,
    },
    {
      type: "text",
      text: `Name: ${customer.contactPerson}`,
      x: 50,
      y: height - 22 * fontSize,
    },
    {
      type: "text",
      text: `Company name: ${customer.companyName}`,
      x: 50,
      y: height - 23 * fontSize,
    },
    {
      type: "text",
      text: `Address: ${customer.street} ${customer.house}/ ${customer.apartment}`,
      x: 50,
      y: height - 24 * fontSize,
    },
    {
      type: "text",
      text: `Country, city, postal code: ${customer.countryName} ${customer.city} ${customer.index}`,
      x: 50,
      y: height - 25 * fontSize,
    },
    {
      type: "text",
      text: `VAT number: ${customer.vatNr}`,
      x: 50,
      y: height - 26 * fontSize,
    },
    {
      type: "text",
      text: "Description",
      x: 150,
      y: height - 29 * fontSize,
    },
    {
      type: "rectangle",
      x: 50,
      y: height - 30 * fontSize,
      width: 275,
      height: 30,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1.5,
    },
    {
      type: "text",
      text: "Qty",
      x: 340,
      y: height - 29 * fontSize,
    },
    {
      type: "rectangle",
      x: 325,
      y: height - 30 * fontSize,
      width: 50,
      height: 30,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1.5,
    },
    {
      type: "text",
      text: "Price",
      x: 395,
      y: height - 29 * fontSize,
    },
    {
      type: "rectangle",
      x: 375,
      y: height - 30 * fontSize,
      width: 70,
      height: 30,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1.5,
    },
    {
      type: "text",
      text: "Amount",
      x: 480,
      y: height - 29 * fontSize,
    },
    {
      type: "rectangle",
      x: 445,
      y: height - 30 * fontSize,
      width: 100,
      height: 30,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1.5,
    }
  ]
}

function productInvoiceFields (height, fontSize, verticalPosition, product, amount, timesRomanFont) { 
  
   const text = wrapText(product.product.name, 275,timesRomanFont,fontSize)
  return [
  {
    type: "text-product",
    text: text,
    x: 55,
    y: height - verticalPosition * fontSize,
    lineHeight: 14
  },
  {
    type: "rectangle-product",
    x: 50,
    y: height - (verticalPosition + 1.5) * fontSize,
    width: 275,
    height: 30,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1.5,
  },
  {
    type: "text-product",
    text: `${product.cartQuantity}`,
    x: 345,
    y: height - verticalPosition * fontSize,
  },
  {
    type: "rectangle-product",
    x: 325,
    y: height - (verticalPosition + 1.5) * fontSize,
    width: 50,
    height: 30,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1.5,
  },
  {
    type: "text-product",
    text: `€ ${product.product.currentPrice}`,
    x: 385,
    y: height - verticalPosition * fontSize,
  },
  {
    type: "rectangle-product",
    x: 375,
    y: height - (verticalPosition + 1.5) * fontSize,
    width: 70,
    height: 30,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1.5,
  }, 
  {
    type: "text-product",
    text: `€ ${amount}`,
    x: 480,
    y: height - verticalPosition * fontSize,
  },
  {
    type: "rectangle-product",
    x: 445,
    y: height - (verticalPosition + 1.5) * fontSize,
    width: 100,
    height: 30,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1.5,
  }
]
}
function deliveryTableFields (height, fontSize, order, verticalPosition) {
  return [
    {
      type: "text-dynamic",
      text: "Delivery",
      x: 55,
      y: height - verticalPosition * fontSize,
    },
    {
      type: "rectangle-dynamic",
      x: 50,
      y: height - (verticalPosition + 1) * fontSize,
      width: 275,
      height: 25,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1.5,
    },
    {
      type: "text-dynamic",
      text: ``,
      x: 345,
      y: height - verticalPosition * fontSize,
    },
    {
      type: "rectangle-dynamic",
      x: 325,
      y: height - (verticalPosition + 1) * fontSize,
      width: 50,
      height: 25,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1.5,
    },
    {
      type: "text-dynamic",
      text: `€ ${order.deliveryPrice}`,
      x: 385,
      y: height - verticalPosition * fontSize,
    },
    {
      type: "rectangle-dynamic",
      x: 375,
      y: height - (verticalPosition + 1) * fontSize,
      width: 70,
      height: 25,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1.5,
    }, 
    {
      type: "text-dynamic",
      text: `€ ${order.deliveryPrice}`,
      x: 480,
      y: height - verticalPosition * fontSize,
    },
    {
      type: "rectangle-dynamic",
      x: 445,
      y: height - (verticalPosition + 1) * fontSize,
      width: 100,
      height: 25,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1.5,
    }
  ]
}
function paymentTableFields (height, fontSize, paymentFee, verticalPosition) {

  return [
     {
      type: "text-dynamic",
      text: "Payment fee (1,7%)",
      x: 55,
      y: height - verticalPosition * fontSize,
    },
    {
      type: "rectangle-dynamic",
      x: 50,
      y: height - (verticalPosition + 1) * fontSize,
      width: 275,
      height: 25,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1.5,
    },
    {
      type: "text-dynamic",
      text: ``,
      x: 345,
      y: height - verticalPosition * fontSize,
    },
    {
      type: "rectangle-dynamic",
      x: 325,
      y: height - (verticalPosition + 1) * fontSize,
      width: 50,
      height: 25,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1.5,
    },
    {
      type: "text-dynamic",
      text: `€ ${paymentFee}`,
      x: 385,
      y: height - verticalPosition * fontSize,
    },
    {
      type: "rectangle-dynamic",
      x: 375,
      y: height - (verticalPosition + 1) * fontSize,
      width: 70,
      height: 25,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1.5,
    }, 
    {
      type: "text-dynamic",
      text: `€ ${paymentFee}`,
      x: 480,
      y: height - verticalPosition * fontSize,
    },
    {
      type: "rectangle-dynamic",
      x: 445,
      y: height - (verticalPosition + 1) * fontSize,
      width: 100,
      height: 25,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1.5,
    }
  ]}

  function discountTableFields (height, fontSize, order, verticalPosition) {
    return[
      {
        type: "text-dynamic",
        text: "Discount",
        x: 55,
        y: height - verticalPosition * fontSize,
      },
      {
        type: "rectangle-dynamic",
        x: 50,
        y: height - (verticalPosition + 1) * fontSize,
        width: 275,
        height: 25,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1.5,
      },
      {
        type: "text-dynamic",
        text: ``,
        x: 345,
        y: height - verticalPosition * fontSize,
      },
      {
        type: "rectangle-dynamic",
        x: 325,
        y: height - (verticalPosition + 1) * fontSize,
        width: 50,
        height: 25,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1.5,
      },
      {
        type: "text-dynamic",
        text: `€ ${order.discount}`,
        x: 385,
        y: height - verticalPosition * fontSize,
      },
      {
        type: "rectangle-dynamic",
        x: 375,
        y: height - (verticalPosition + 1) * fontSize,
        width: 70,
        height: 25,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1.5,
      }, 
      {
        type: "text-dynamic",
        text: `€ ${order.discount}`,
        x: 480,
        y: height - verticalPosition * fontSize,
      },
      {
        type: "rectangle-dynamic",
        x: 445,
        y: height - (verticalPosition + 1) * fontSize,
        width: 100,
        height: 25,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1.5,
      }
    ]
  }
function totalTableFields (height, fontSize, order, cartQuantity, verticalPosition) {
 
  return [
  {
    type: "text-dynamic",
    text: "TOTAL",
    x: 280,
    y: height - verticalPosition  * fontSize,
  },
  {
    type: "text-dynamic",
    text: `${cartQuantity}`,
    x: 345,
    y: height - verticalPosition * fontSize,
  },
  {
    type: "rectangle-dynamic",
    x: 325,
    y: height - (verticalPosition + 1) * fontSize,
    width: 50,
    height: 25,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1.5,
  },
  {
    type: "text-dynamic",
    text: "",
    x: 385,
    y: height - verticalPosition * fontSize,
  },
  {
    type: "rectangle-dynamic",
    x: 375,
    y: height - (verticalPosition + 1) * fontSize,
    width: 70,
    height: 25,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1.5,
  },
  {
    type: "text-dynamic",
    text: `€ ${order.totalSum}`,
    x: 480,
    y: height - verticalPosition * fontSize,
  },
  {
    type: "rectangle-dynamic",
    x: 445,
    y: height - (verticalPosition + 1) * fontSize,
    width: 100,
    height: 25,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1.5,
  },
  ]
}

function dynamicInvoiceFields (height, fontSize, order, customer, verticalPosition) {
  return [
  {
    type: "text-dynamic",
    text: `"La entrega dentro de la comunidad está exenta en virtud del artículo 25 de la Ley 37/1992 del IVA"`,
    x: 50,
    y: height - (verticalPosition + 4) * fontSize,
    size: 9
  },
  {
    type: "text-dynamic",
    text: "Payment terms - Advance payment",
    x: 50,
    y: height - (verticalPosition + 6) * fontSize,
    size: 13
  },
  {
    type: "text-dynamic",
    text: "Delivery address",
    x: 50,
    y: height - (verticalPosition + 7) * fontSize,
  },
  {
    type: "text-dynamic",
    text: `${customer.companyName}`,
    x: 50,
    y: height - (verticalPosition + 8) * fontSize,
  },
  {
    type: "text-dynamic",
    text: `${order.deliveryAddress.firstName} ${order.deliveryAddress.lastName}`,
    x: 50,
    y: height - (verticalPosition + 9) * fontSize,
  },
  {
    type: "text-dynamic",
    text: `${order.deliveryAddress.street} ${order.deliveryAddress.house} ${order.deliveryAddress.apartment}`,
    x: 50,
    y: height - (verticalPosition + 11) * fontSize,
  },
  {
    type: "text-dynamic",
    text: `${order.deliveryAddress.telephone}`,
    x: 50,
    y: height - (verticalPosition + 12) * fontSize,
  },
  {
    type: "text-dynamic",
    text: `${order.deliveryAddress.index} ${order.deliveryAddress.city}`,
    x: 50,
    y: height - (verticalPosition + 13) * fontSize,
  },
  {
    type: "text-dynamic",
    text: `${order.deliveryAddress.countryName}`,
    x: 50,
    y: height - (verticalPosition + 14) * fontSize,
  },
  {
    type: "text-dynamic",
    text: "*The mere possession of this invoice does not presuppose its paymen document.",
    x: 55,
    y: height - (verticalPosition + 16) * fontSize,
    size: 10
  },
  {
    type: "text-dynamic",
    text: "THANK YOU FOR YOUR TRUST",
    x: 200,
    y: height - (verticalPosition + 18) * fontSize,
  }
]
}

module.exports = {staticInvoiceFields, dynamicInvoiceFields, productInvoiceFields, totalTableFields, deliveryTableFields, paymentTableFields, discountTableFields }