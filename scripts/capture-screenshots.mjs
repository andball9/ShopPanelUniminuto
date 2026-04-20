import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });

await page.goto("http://127.0.0.1:5173", { waitUntil: "networkidle" });
await page.screenshot({
  path: "docs/screenshots/01-listado-usuarios.png",
  fullPage: true,
});

await page.fill("#name", "Miguel Torres");
await page.fill("#email", "miguel.torres@correo.com");
await page.fill("#role", "Desarrollador Front-end");
await page.screenshot({
  path: "docs/screenshots/02-formulario-usuario.png",
  fullPage: true,
});

await page.click('button[type="submit"]');
await page.waitForSelector("text=Usuario creado correctamente.");
await page.screenshot({
  path: "docs/screenshots/03-usuario-creado.png",
  fullPage: true,
});

await page.getByRole("row", { name: /Miguel Torres/ }).getByRole("button", { name: "Eliminar" }).click();
await page.waitForSelector("text=Usuario eliminado correctamente.");
await page.screenshot({
  path: "docs/screenshots/04-usuario-eliminado.png",
  fullPage: true,
});

await page.goto("http://127.0.0.1:5173/swagger.html", { waitUntil: "networkidle" });
await page.screenshot({
  path: "docs/screenshots/05-swagger-ui.png",
  fullPage: true,
});

await browser.close();
