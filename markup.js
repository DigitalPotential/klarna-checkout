export function getProductMarkup(products) {
  return products
    .map(
      (p) => `
        <a style="display:block;color:black;border:solid black 2px;margin: 20px; padding:10px; text-decoration:none; text-align:center; background-color: #f2f2f2; border-radius: 5px; box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);" href="/product/${p.id}">
          <div style="font-size: 20px; font-weight: bold; margin-bottom: 10px;">${p.title}</div>
          <div style="font-size: 16px; margin-bottom: 10px;">${p.description}</div>
          <div style="font-size: 18px; font-weight: bold;">${p.price}kr</div>
        </a>
      `
    )
    .join(' ');
}