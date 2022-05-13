
package termprojectbackend;
// Remember to add the Maven dependency! You may also
// need to option-enter (alt-enter) and pick a
// "Maven: add ... to classpath" option.
import io.github.bonigarcia.wdm.WebDriverManager;

import java.time.Duration;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.support.ui.Select;

/**
 * Easier to setup than a junit test
 */
public class Main {

  static int testsRun = 0;
  static int testsFailed = 0;
/**
 *  This is a fake main file that runs the selenium code because this seemed easier than doing a
 *  JUnit test.
 * @param args normal main arguments
 */
  public static void main(String[] args) {
    // There will be various messages in the console...
    //   (By default, Selenium prints a lot of info)

    // TODO: write multiple tests
    // Main.testData("movies");
    // Main.testData("kanban");
    Main.testData("horoscopes");
    System.out.println("\nTests Failed: " + testsFailed);
    System.out.println("Tests Run. " + testsRun);
  }

  private static void testData(String dataname) { 
    // using altered versions of the actual Main and REPLData, to automate command calls

    // do the loading before the html site is opened
    // MainCopy mainCopy = new MainCopy(new String[] {"./run", "--gui"});
    // mainCopy.callCommand(new String[] {"load_db", dataname});

    // Use WDM, not manual download
    WebDriverManager.firefoxdriver().setup();

    String calendarLocation = "localhost:3001"; 
    // String calendarLocation = "https://cs32termproject.web.app/calendar"; 
    FirefoxOptions options = new FirefoxOptions();
    FirefoxDriver driver = new FirefoxDriver(options);
    driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
    try {
      driver.get(calendarLocation);
      System.out.println(driver.getTitle());
      // TODO: actually test properties of the visualizer now that it is open in selenium 

      // the "Get Data" button
      WebElement loadButton = driver.findElement(By.id("loader"));
      assert loadButton.getText().equals("Get Data"): "Get Data button is missing";
      loadButton.click();

      // TODO: Make sure that the code below is run on each sql table
      // TODO: use Select library
      WebElement sqlTable = driver.findElement(By.id("sqlTable"));
      Select tableSelect = new Select(sqlTable);
      List<WebElement> tableNames = sqlTable.findElements(By.tagName("option"));
      for (WebElement option : tableNames) { 
        tableSelect.selectByValue(option.getText());
        // Main.checkTable(driver);
      }
      // WebElement tableHeader = table.findElemest(By.tagName("th"));
    } catch (Exception e) { 
      System.out.println( '\n' + dataname + " Test Failed" + '\n');
      testsFailed++;
    } catch (AssertionError e) { 
      System.out.println( '\n' + dataname + " Test Failed" + '\n');
      testsFailed++;
    }
     finally {
      // TODO: uncomment so that the test can be run
      // driver.quit();
      testsRun++;
    }
    // driver.quit();
  }

  // /**
  //  * This method checks certain aspects of the given sql table
  //  * @param driver the driver that has loaded the database and opened the html site
  //  */
  // private static void checkTable(FirefoxDriver driver) throws AssertionError { 
  //   // get the table
  //   WebElement content = driver.findElement(By.id("content")); 
  //   WebElement table = content.findElement(By.tagName("table"));
  //   WebElement tableHeader = table.findElement(By.tagName("thead")).findElement(By.tagName("tr"));
  //   List<WebElement> headerElements = tableHeader.findElements(By.tagName("th"));
  //   // keep track of the number of columns that there should be
  //   int numCols = headerElements.size();
  //   // TODO: Not sure if there is anything else to check for the table header

  //   // check table body
  //   WebElement tableBody = table.findElement(By.tagName("tbody"));
  //   List<WebElement> tbodyRows = tableBody.findElements(By.tagName("tr"));
  //   for (WebElement row : tbodyRows) { 
  //     // TODO: check the number of columns
  //     List<WebElement> cellList = row.findElements(By.tagName("td"));
  //     assertEquals(cellList.size(), numCols);
  //     // TODO: check first cell to make sure there is a delete row button
  //     List<WebElement> firstCellButtons = cellList.get(0).findElements(By.tagName("button"));
  //     boolean assertVal =  firstCellButtons.size() == 2;
  //     // assertVal = Main.hasString(firstCellButtons, "deletea"); // TODO: DEMO
  //     assertVal =  Main.hasString(firstCellButtons, "delete");
  //     assertVal =  Main.hasString(firstCellButtons, "update");
  //     assert assertVal;
  //     // firstCell.findElement
  //     // TODO: make sure that every cell has a text input
  //     for (int col = 1; col < numCols; col++) { 
  //       WebElement cell = cellList.get(col);
  //       List<WebElement> cellButtons = cell.findElements(By.tagName("button"));
  //       // the cells that are not in the first column should have only one button
  //       assert cellButtons.size() == 1: "There should only be one button";
  //       // that button should be the update button
  //       assert Main.hasString(cellButtons, "update"): "Missing update button";
  //     }
  //   }
  // }

  // /**
  //  * Go through all elements of a buttonList and make sure there is a delete
  //  * @param buttonList - list of buttons found in the first column of a table
  //  * @param buttonName - Name of the button that we are checking for
  //  * @return boolean of whether there is a button in the list named buttonName
  //  */
  // private static boolean hasString(List<WebElement> buttonList, String buttonName) throws AssertionError { 
  //   boolean foundDelete = false;
  //   for (WebElement button : buttonList) { 
  //     if (button.getText().equals(buttonName)) { 
  //       foundDelete = true;
  //       break;
  //     }
  //   }
  //   if (!foundDelete) { 
  //     throw new AssertionError();
  //   }
  //   return true;
  // }
}

