export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const scrollToRef = (ref) => {
  ref.current.scrollIntoView({ block: "start", behavior: "smooth" })
};

export async function fetchData(url, reqBody) {
  try {
    const response = await fetch(url, reqBody);
    if (!response.ok) {
      // handleError(response, 401);
      const error = await response.json();
      throw new Error(error?.loginOrEmail || error?.password || error?.message || error?.email || error);
    }
    return await response.json();
  } catch (error) {
    throw new Error(error?.message);
  }
}