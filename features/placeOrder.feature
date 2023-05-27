Feature: Place order 

  Scenario Outline: Purchase a product successfully

    Given I am on the website
    When I apply the following filter <Filters>
    And I click on a <which> item
    And I select a <size>, <color>, and <quantity>
    And I add the item to my cart
    Then I should see a confirmation message indicating that the item was added to my cart
    When I proceed to checkout
    And I fill out the shipping form and select a cheaper shipping method
    Then I should see my data and order summary correctly
    When I place my order
    Then I should receive a confirmation message indicating that my order was successful
    
    Examples:
      |Filters            |which        |size   |color |quantity|
      |Men,Pants          |random       |random |random|2       |


    
