import {Given, When, Then} from '@cucumber/cucumber';
import Helper from '../../helpers/Helper';
import Market from '../pageobjects/Market';
import ProductPage from '../pageobjects/ProductPage';
import CheckOut from '../pageobjects/CheckOut';


Given(/^I am on the website$/, async function () {
  await browser.maximizeWindow()
  await browser.url('/')
});

When(/^I apply the following filter (.+)$/, async function (filters:string) {
  await Helper.aplyFilter(filters)
});

When(/^I click on a (.+) item$/, async function (item:string | number) {
  await Market.selectProduct(item)
});

When(/^I select a (.+), (.+), and (.+)$/, async function (size:string | number, color:string, qty:number) {
  await ProductPage.cutomizeProduct(size, color,true)
  await ProductPage.selectQty(qty)
});

When(/^I add the item to my cart$/,async function () {
  await ProductPage.addToCart()    
});

Then(/^I should see a confirmation message indicating that the item was added to my cart$/,async function () {
  await ProductPage.successMsg()
});

When(/^I proceed to checkout$/,async function () {
  await Helper.goToCart()
});

When(/^I fill out the shipping form and select a cheaper shipping method$/,async function () {
  await CheckOut.fillForm()
});

Then(/^I should see my data and order summary correctly$/,async function () {
  await CheckOut.checkSumaryOrder()
});

When(/^I place my order$/, async function () {
  await CheckOut.placeOrderButton.click()
});

Then(/^I should receive a confirmation message indicating that my order was successful$/,async function () {
  await CheckOut.purchaseSuccess});



