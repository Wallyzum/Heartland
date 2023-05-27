
import Helper from '../../helpers/Helper'
import { CustomerData } from '../src/Interfaces'
class CheckOut {
    get emailAddressInput () {return $('//div[@class = "control _with-tooltip"]/input[@name="username"]')}
    get firtsNameInput () {return $('//input[@name="firstname"]')}
    get lastNameInput () {return $('//input[@name="lastname"]')}
    get companyInput () {return $('//input[@name="company"]')}
    get streetAddressInput () {return $('//input[@name="street[0]"]')}
    get cityInput () {return $('//input[@name="city"]')}
    get stateProvDropDown () {return $('//select[@name="region_id"]')}
    get zipInput () {return $('//input[@name="postcode"]')}
    get countryDropDown() {return $('//select[@name="country_id"]')}
    get phoneInput () {return $('//input[@name="telephone"]')}
    get continueButton () {return $('//button[@data-role="opc-continue"]')}
    get shippingMethods () {return $$('//table[@class = "table-checkout-shipping-method"]/tbody/tr')}
    get placeOrderButton () {return $('//span[contains(text(),"Place Order")]')}
    get orderSumary () {return $('div.shipping-information-content')}
    get successTitle () {return $('h1.page-title')}
    get orderNumber () {return $('//div[@class="checkout-success"]/p/span')}
    public randomCustomer:CustomerData;
    public sumaryData:CustomerData;

    async fillForm (){
        const randomStateCode = Math.floor(Math.random()*50)
        const randomCustomer = Helper.createRandomUser()
        await this.countryDropDown.selectByAttribute('value', 'US')
        await this.emailAddressInput.setValue(randomCustomer.email)
        await this.firtsNameInput.setValue(randomCustomer.firstname)
        await this.lastNameInput.setValue(randomCustomer.lastname)
        await this.companyInput.setValue(randomCustomer.company)
        await this.streetAddressInput.setValue(randomCustomer.address)
        await this.cityInput.setValue(randomCustomer.city)
        await this.stateProvDropDown.selectByIndex(randomStateCode)
        await this.zipInput.setValue(randomCustomer.zip)
        await this.phoneInput.setValue(randomCustomer.phone)
        await this.selectCheaperShippingMethod()
        await this.continueButton.click()  
        await this.placeOrderButton.waitForClickable()
        this.randomCustomer = randomCustomer
        const stateSelected =  $('//option[@value="'+randomStateCode+'"]')
        this.randomCustomer.state = await stateSelected.getAttribute("data-title")
        for (var item in this.randomCustomer){
            console.log("====>"+item+":"+this.randomCustomer[item])
        }
        
    }

    public async selectCheaperShippingMethod (){
        const shippingMethodList = await this.shippingMethods
        const length = shippingMethodList.length
        const shippingPriceList:number[] = []
        if (length > 1){
            for (var i = 0 ; i < length ; i++){
                const shippingMethod = shippingMethodList[i].$$('td')
                const shippingPrice:string = await shippingMethod[1].getText()
                const shippingPriceFloat = parseFloat(shippingPrice.replace('$', ''))
                shippingPriceList.push(shippingPriceFloat)
            }
        }
        const cheaper = Math.min(...shippingPriceList)
        const index = shippingPriceList.indexOf(cheaper)
        const shippingButton = shippingMethodList[index].$('td')
        shippingButton.click()
        await browser.pause(2000)

    }

    public async checkSumaryOrder(){
        const sumaryText = await this.orderSumary.getText()
        var sumaryArray = sumaryText.split(/\n|,/);
        sumaryArray = sumaryArray.filter((elemento, indice) => {
            return sumaryArray.indexOf(elemento) === indice;})
        sumaryArray.forEach((elm,index)=>{
            sumaryArray[index] = elm.trim();
        })
        let postalCode = sumaryArray[3].split(' ');
        sumaryArray.splice(3, 1, postalCode.splice(0,postalCode.length-1).join(" "), postalCode[postalCode.length-1])
        let names = sumaryArray[0].split(' ');
        sumaryArray.splice(0,1,names[0],names[1])
        this.sumaryData = {
            firstname: sumaryArray[0],
            lastname: sumaryArray[1],
            address: sumaryArray[2],
            city: sumaryArray[3],
            state: sumaryArray[4],
            zip: sumaryArray[5],
            country: sumaryArray[6],
            phone: sumaryArray[7]
        }

        this.validateSumaryInfo(this.sumaryData, this.randomCustomer)
    }

    public validateSumaryInfo (sumaryData:CustomerData , customerData:CustomerData){
        const {email, company, ...customerDataToValidate} = customerData;
        console.log("$$$$$$$$$$$Sumary = "+sumaryData.toString())
        console.log("%%%%%%%%%%Customer = "+customerData.toString())
        expect(sumaryData).toEqual(customerDataToValidate)
    }



    public async purchaseSuccess (){
        expect( await this.successTitle.getText()).toEqual("Thank you for your purchase!")
        expect(await this.orderNumber).toBeExisting
    }



}
export default new CheckOut()