import * as fs from "fs";

type Item = {
    itemId: string;
    itemName: string;
    price: number;
    currency: string;
}

type Data = {
    catalog: {
        categoryName: string;
        categoryId: string;
        itemsCount: number;
        items: Item[]
    }[]
}
function readCatalogSync(): Data | undefined {
   const file = "./data/catalog.json";

   if (fs.existsSync(file)) {
     const content = fs.readFileSync(file).toString();
     const catalog = JSON.parse(content);
     return catalog;
   }

   return undefined;
 }

export function findItems(categoryId: string): Item[] | undefined {
  console.log('Returning all items for categoryId: ' + categoryId);
  const catalog = readCatalogSync();
  if (catalog) {
    let items = [];
    for (let index in catalog.catalog) {
        if (catalog.catalog[index].categoryId === categoryId) {
          const category = catalog.catalog[index];
          for (let itemIndex in category.items) {
            items.push(category.items[itemIndex]);
          }
        }
    }
    return items;
  }
  return undefined;
}

export function findItem(categoryId: string, itemId: string): Item | undefined {
  console.log('Looking for item with id' + itemId);
  const catalog = readCatalogSync();
  if (catalog) {
    for (let index in catalog.catalog) {
        if (catalog.catalog[index].categoryId === categoryId) {
          let category = catalog.catalog[index];
          for (let itemIndex in category.items) {
            if (category.items[itemIndex].itemId === itemId) {
              return category.items[itemIndex];
            }
          }
        }
    }
  }
  return undefined;
}

export function findCategoryies(): Data[] {
  console.log('Returning all categories');
  const catalog = readCatalogSync();
  if (catalog) {
    const categories = [];
    for (let index in catalog.catalog) {
        let category = {};
        category["categoryId"] = catalog.catalog[index].categoryId;
        category["categoryName"] = catalog.catalog[index].categoryName;

        categories.push(category);
    }
    return categories;
  }
  return [];
}