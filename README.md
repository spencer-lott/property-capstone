# Property Manager

Property Manager is an app designed for property management companies. With it a company can see all the properties they are responsible for with its specific details as well as the tenant assigned to it. It's simplicity allows employees to have quick access to key information to help make calls, emails, or work towards filling a vacancy.

## Demo
This app was built as a final, full stack capstone project at the end of a 6-month bootcamp called [NewForce](https://generationwv.org/programs/newforce/).

You can watch a video of me presenting my app [HERE]()!

## Testing Instructions
After cloning this repository to your own machine,

**Create the Database:**
1. Open Visual Studio.
2. At the start screen, select `Open a Local Folder`.
4. Navigate to your workspace directory, open the `PM Capstone 2` folder, then select the SQL folder.
5. Execute BOTH .sql files in the [SQL folder](https://github.com/spencer-lott/property-capstone/tree/main/SQL) with the green play button in the top left of the window. (The first file creates the database and tables if they don’t already exist, and the second file inserts some sample data into those tables for testing)

**Run the API:**
1. Open Visual Studio.
2. At the start screen, select `Open a project or solution`.
3. Navigate to your workspace directory, open the `PM Capstone 2` folder, and select the **.sln** file to run the solution.
4. Hit the Green play button on the toolbar that says "PM Capstone 2".
5. This will run the API along with an API tool [Swagger](https://swagger.io/docs/specification/2-0/what-is-swagger/) for testing at the address `https://localhost:5001/swagger/index` and open it in your default browser.

**Run the Client:**
1. In your command line, cd into the [Client Folder](https://github.com/spencer-lott/property-capstone/tree/main/PM%20Capstone%202/client), and into the folder named `pmcapstone`.
2. Run `npm install react-scripts`. Once this has been installed, run `npm start`.
3. This will run the React app at the address `http://localhost:3000/` and open it in your default browser.