# News Real

News Real is a full-stack application that allows users to keep track of and analyze the online news they consume. Users have access to a news feed of recently published news articles via the Currents API. Users are able to save primary articles, called snippets, with their reflections. After saving a snippet, users can submit the article for language analysis, which utilizes Cloudmersive’s natural language processing API to test for either subjectivity or sentimentality. If a user finds additional articles that are of importance to the snippet, they can add the reference article as an addendum to the snippet. Reference articles can also be submitted for language analysis and also have space for the user's reflections.

For subjectivity scores: Articles are ranked on a scale of 0 to 100%, with scores closer to 100% having a high probability of objectivity and with scores closer to 0% having a high probability of subjectivity.

For sentimentality scores: Articles are ranked on a scale of 0 to 100% with a positive or negative value. Scores closer to 100% have a high probability of sentimentality and scores closer to 0% have a high probability of neutrality. A score that has a negative value has negative sentiment while a score with a positive value has positive sentiment.

Users visiting the site are greeted with the API's recent news endpoint which provides roughly thirty random news articles that have been recently published. Users can use a search feature to query the API for more specific news articles via the following criteria: keyword, category, domain (exclusive/excluding), and date range.

News Real allows users the ability to not only store references to news they have consumed, but also assess the language used within the article and store their thoughts on the subject at hand. While access to information has become more prevalent, consumer trust continues to fall. News Real attempts to combat this falling sentiment by providing continued access to news resources which users can access for self assessment and personal growth.


### Installation
Along with this repository, you will need to create the News Real database, and API keys from both [Currents](https://currentsapi.services/en/register) and [Cloudmersive](https://account.cloudmersive.com/login) as well. Both Currents and CLoudmersive offer free API keys for development that are sufficient for trial. If you do not have a SQL Server instance follow these steps to create one:
```
Start Visual Studio 2019.
At the start screen select Continue without code.
Open the View menu and select SQL Server Object Explorer.
Right-click the SQL Server node, select Add SQL Server....
In the dialog that appears, expand the Local node and select the SQL Server instance called SQLEXPRESS.
Click Connect.
```

Once you have a SQL Server instance listed in your SQL Server Object Explorer, run the two files located in the SQL directory of this repository in the following order:
##### Step One: Create the database
```
Open the file " 01_Db_Create.sql " via the menu options File -> Open -> File
If not already connected to SQL Server instance:
- Click the " connect " icon below the file tab that reads " 01_Db_Create.sql "
- In the local drop-down arrow select the SQL Server instance you just created (name should read: {your computer name}\SQLExpress
Ensure the "Available Databases" drop-down (located to the right of the " connect " icon) has "master" selected.
If "master" is not selected, change the selection to "master"
Click the green " Execute " icon
Check the output window to ensure the database was created successfully
You have now created the News Real database
```
##### Step Two: Add seed data (optional)
```
Open the file " 02_Seed_Data.sql " via the menu options File -> Open -> File
If not already connected to SQL Server instance (you should be at this point):
- Click the " connect " icon below the file tab that reads " 01_Db_Create.sql "
- In the local drop-down arrow select the SQL Server instance you just created (name should read: {your computer name}\SQLExpress)
Ensure the "Available Databases" drop-down (located to the right of the " connect " icon) has "NewsReal" selected.
If "NewsReal" is not selected, change the selection to "NewsReal"
Click the green "Execute" icon
Check the output window to ensure the seed data was added successfully
You have now have data in the News Real database
```

One more step before beginning, adding our API keys:
Links: [Currents](https://currentsapi.services/en/register), [Cloudmersive](https://account.cloudmersive.com/login), [user secrets file location](https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-3.1&tabs=windows)
```
Visit both Currents and Cloudmersive
Register at each for free accounts
In the Visual Studio Solutions Explorer, right click the NewsReal project name and select "Manage User Secrets"
You will be directed to a secrets.json file
Copy your API keys into their respective spots:

{
  "CurrentsApiKey": "thisIsWhereYourCurrentsAPIKeyShouldGo",
  "CloudmersiveApiKey": "thisIsWhereYourCloudmersiveAPIKeyShouldGo"
}
Save and close.
Your API key is located in a user secrets file (linked above) outside this repository/filestructure
```

Once you have cloned this repository, created your database, added your seed data (optional), and added your API keys to your User Secrets, do the following to start your API:
```
Open the News Real solution file "NewsReal.sln" with VS
Ensure the Startup Projects drop-down is selected as NewsReal and NOT NewsReal.Tests
To the right of the green execute icon select NewsReal in the drop-down select
Click execute
```
To start the application, run the following command in your terminal inside of the "client" directory located at NewsReal/NewsReal/client:
```
npm start
```


### Seed Data
Login with the following dummy user data to view a user that has a few saved articles:

Email Address: mi<span>chael@exam</span>ple.comx

Password: 123456

If you would like to create your own account, feel free to use the register option to do so.


### Technologies
Server Side
[.NET Core](https://dotnet.microsoft.com/download) with [C#](https://docs.microsoft.com/en-us/dotnet/csharp/)

[Entity Framework](https://docs.microsoft.com/en-us/ef/) utilized for communicating with the SQL Server database

[ADO.NET Core](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-3.1) utilized for communicating with the SQL Server database

Client Side
[React](https://reactjs.org/)

[Material UI](https://material-ui.com/) for styling

Other
[Google Firebase](https://firebase.google.com/) is used for user authentication

[date-fns](https://date-fns.org/) library for date manipulation

[lodash.debounce](https://www.npmjs.com/package/lodash.debounce) to debounce user search bar interactions

[dbdiagram.io](https://dbdiagram.io/d) for planning the data structure

[Sketchboard.me](https://sketchboard.io/) for wireframing
