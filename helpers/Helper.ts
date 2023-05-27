import NavBar from "../features/pageobjects/NavBar"
import SideBar from "../features/pageobjects/SideBar"
import casual from 'casual'
import { CustomerData } from "../features/src/Interfaces"

class Helper {

    get cartButton () {return $('//a[@class="action showcart"]')}
    get proceedToCheckOutButton () {return $('#top-cart-btn-checkout')}

    async goTo(element: WebdriverIO.Element){
        await element.click()
    }

    async aplyFilter(filter:string){
        const filters: string[] = filter.split(",")
        const navBarButtonName: string = filters[0]
        const navBarButton : WebdriverIO.Element = await  NavBar.getButton(navBarButtonName)
        await this.goTo(navBarButton)
        expect(navBarButtonName).toEqual(await (await SideBar.getFilterPath()).getText())
        filters.shift()

        for (const filter of filters){
            const element: WebdriverIO.Element = await SideBar.getFilterButton(filter)
            await this.goTo(element)
            expect(filter).toEqual(await (await SideBar.getFilterPath()).getText())
        }
    }

    async goToCart (){
        await this.goTo(await this.cartButton)
        await browser.pause(3000)
        expect(await this.proceedToCheckOutButton).toBeClickable
        await this.goTo(await this.proceedToCheckOutButton)
        await browser.pause(3000)

    }

    public createRandomUser ():CustomerData{
        return {
            email: casual.email,
            firstname: casual.first_name,
            lastname: casual.last_name,
            company: casual.company_name,
            address: casual.address1,
            city: casual.city,
            state: casual.state,
            zip: casual.zip(5),
            country: "United States",
            phone: casual.phone,
        }   
    }

    
    
    
}
export default new Helper()