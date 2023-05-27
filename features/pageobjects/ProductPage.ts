import FilterOptions from '../src/features'

class ProductPage {
    get addToCartButton () {return $('//button[@type = "submit"]/span[contains(text(),"Add to Cart")]')}
    async colorButton (color:string) {return await $('//div[@option-label = "'+color+'"]')}
    async sizeButton (size:string | number) {return await $('//div[@option-label = "'+size+'"]')}
    get availableColors () {return $$('//span[contains(text(),"Color")]//following-sibling::div/div')}
    get availableSizes () {return $$('//span[contains(text(),"Size")]//following-sibling::div/div')}
    get qtyInput () {return $('#qty')}
    get getProductName () {return $('//h1[@class = "page-title"]/span').getText()}
    get getMessage () {return $('//div[@role="alert"]/div/div').getText()}

    public validateInputs (sizeInput:string | number, colorInput:string){
        var sizeFixed:string = sizeInput.toString()
        var colorFixed:string = 'no'
        if (typeof sizeInput == 'string' && FilterOptions.AVAILABLESTOPSIZES.indexOf(sizeInput) == -1 && sizeInput != 'no'){
            sizeFixed = 'random'
        }else if (typeof sizeInput == 'number' && FilterOptions.AVAILABLEBOTTONSIZES.indexOf(sizeInput) == -1){
            sizeFixed = 'random'
        }else {sizeFixed = sizeInput.toString()}  
        if (FilterOptions.AVAILABLESCOLORS.indexOf(colorInput) == -1 && colorInput != 'no'){colorFixed = 'random'}
        return [sizeFixed,colorFixed]   
    }

    async cutomizeProduct (sizeInput:string | number , colorInput:string, validate:boolean){
        const [size,color] = validate ? this.validateInputs(sizeInput,colorInput) : [sizeInput,colorInput]
    
        if (size != "no" && size != 'random'){
            const sizeSelected = await this.sizeButton(size)
            await sizeSelected.click()
        }
        if (color != "no" && color != "random"){
            const colorSelected = await this.colorButton(color)
            await colorSelected.click()
        }
        if (size == 'random'){
            const sizes:string[] = await this.getAvailablesOptions(await this.availableSizes)
            const sizeSelected = sizes[Math.floor(Math.random() * sizes.length)]
            await this.cutomizeProduct(sizeSelected,"no",false)
        }
        if (color == 'random'){
            const colors:string[] = await this.getAvailablesOptions(await this.availableColors)
            const colorSelected = colors[Math.floor(Math.random() * colors.length)]
            await this.cutomizeProduct("no",colorSelected,false)
        }
    }

    async selectQty (qty: number ){
        await this.qtyInput.setValue(qty) 
    }

    async addToCart (){
        browser.waitUntil(()=>{
            return this.addToCartButton.isClickable()
        },{
            timeout: 5000,
            timeoutMsg: 'timeout'
        });
        await this.addToCartButton.click()
    }

    async successMsg (){
        const productName: string = await this.getProductName
        const message: string = await this.getMessage
        console.log(message)
        expect(message).toBe("You added "+productName+" to your shopping cart.")
    }

    async getAvailablesOptions (options:WebdriverIO.Element[]){
        const availableOptions:string[] = [];
        const length: number = options.length;
        for (var i:number = 0 ; i < length ; i++ ){
            const availableOption:string = await options[i].getAttribute('option-label')
            availableOptions.push(availableOption) 
        }
        return  availableOptions
    }


}
export default new ProductPage()