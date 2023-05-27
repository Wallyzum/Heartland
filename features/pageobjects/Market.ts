import ProductPage from './ProductPage'
class Market {
    get getTotalItems () {return $$('//div[@class = "product-item-info"]')}
    async getItemByName (name:string) {return await $('//a[contains(text(),"'+name+'")]')}
    
    async selectProduct (id : string | number){
        if (id == 'random'){
            const items: WebdriverIO.Element[] = await this.getTotalItems
            const randonIndex: number = Math.floor(Math.random() * items.length+1)
            await items[randonIndex].click()
            expect(ProductPage.addToCartButton).toBeClickable
        }
        if (typeof id == 'string' && id != 'random'){
            const item: WebdriverIO.Element = await this.getItemByName(id)
            await item.click()
            expect(ProductPage.addToCartButton).toBeClickable
        }
        if (typeof id == 'number'){
            expect(id).toBeLessThan((await this.getTotalItems).length)
            const items = await this.getTotalItems
            await items[id].click()
            expect(ProductPage.addToCartButton).toBeClickable
        }
    }
}
export default new Market()