class  NavBar{
    async getButton (button:string) {return await $('//span[contains(text(),"'+button+'")]')}
}
export default new NavBar()