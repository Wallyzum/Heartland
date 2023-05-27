class SideBar {
    async getFilterButton (button:string) {return await $('//a[contains(text(),"'+button+'")]')}
    async getFilterPath () {return await $('//div[@class = "breadcrumbs"]/ul/li[last()]')}
}
export default new SideBar()