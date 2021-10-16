// puppeteer kütüphanesi ile web scraping
// npm i puppeteer
// www.xe.com sitesindeb scraping yapacağız

const puppeteer = require("puppeteer");

const scrape = async (from, to, amount) => {
  const url = `https://www.xe.com/currencyconverter/convert/?Amount=${amount}&From=${from}&To=${to}`;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  // scraping yapacağımız sayfadaki çekmek istediğimiz verinin gösterilmesini istediimiz elemanı inspectten xpath ini kopyalayıp buraya getir
  const [element] = await page.$x(
    '//*[@id="__next"]/div[2]/div[2]/section/div[2]/div/main/form/div[2]/div[1]/p[2]'
  );

  // console.log(element);
  // terminalde node index.js ile çalıştırıp bekle, gelen cevap bir array old. bunu deconstruct edeceğiz,
  // bu gelenin property sini çekelim, burada bizim istediğimiz şey web sayfasına bastığı içerik yani textContent

  const text = await element.getProperty("textContent");
  //bize json formatında gelecek, gelen bilgide value kısmı var dikkat bunu json formatından çıkaralım ve string olarak alalım, jsonValue stringfy gibi çalışıyor bize json olan veriyi text olarak veriyor
  // console.log(text);

  const textValue = await text.jsonValue();
  // console.log(textValue);
  //bize 100tl nın usd karşılıının 11.06xxx olarak getirdi

  //buda pdf formatında sitenin o andi durumunu getiriyor
  await page.pdf({ path: "currencySımdı.pdf", format: "a4" });

  browser.close();
};

scrape("TRY", "USD", 100);

// bunlar dışında örneğin çekmek istediğimiz verinin elementine ulaşamadıysak ama tıklayabiliyorsak mesela bir modal/popup vb gibi page click diye bir func u var kütüphanenin, onu kullnarak xpath ini alabliriz
