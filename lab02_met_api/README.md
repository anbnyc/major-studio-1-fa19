### Major Studio 1 - Lab 2: Met Museum API

#### Topics
- Met API Documentation
- How to construct a request
- Endpoints
- Saving and using Json files
- Fetching data using javascript


#### Met API Documentation
https://metmuseum.github.io/

#### How to construct a request
Base URL / Endpoint ? FirstParameter=value & SecondParameter=value



### Endpoints

#### Objects
This is the Objects endpoint:  
https://collectionapi.metmuseum.org/public/collection/v1/objects

You can ask for department  
https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=1

Or objects by ID  
https://collectionapi.metmuseum.org/public/collection/v1/objects/437133

##### Departments
This is the department api  
https://collectionapi.metmuseum.org/public/collection/v1/departments

#### Search
The search api  
https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflowers


### Exercises
#### 01: Requests
Construct the following requests:
- All objects from the Islamic Art Departments
- All objects from the Islamic Art and Fashion Departments
- All objects that are ceramic
- All objects that are Furniture and from China
- All objects that are on view, have images and are related to a tree
