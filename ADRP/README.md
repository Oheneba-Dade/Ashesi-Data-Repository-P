# Ashesi Data Repository Backend

This is the backend for the Ashesi Data Repository Project.
It has been built using the **Django Rest Framework (DRF)**. 
it serves purely as an API and does not render any of the frontend pages for the project.

### Key Features
1. **Authentication** via OTP and JWTs
2. **Email Notifications** 
3. **Uploading of Collections** and related dataset files
4. **Querying Collections** based on various criteria
5. **Site wide statistics** including number of downloads,views and submited collections


### Project Structure
-   The project follows the following structure

```
ADRP/                                       # Project root
│   │── ADRP/                               # Django project folder
│   │   ├── backend_services/
│   │       ├── accounts_service/           # Contains business logic for user account related functionality i.e auth
│   │       ├── collections_service/        # Logic for collection related functions. e.g upload, approve collecitons
│   │       ├── dataset_service/            # Logic for dataset related functions e.g upload dataset
│   │       ├── email_service/              # Logic for email notifcations e.g send OTP, collection approved 
│   │       ├── statistics_service/         # Logic for tracking site wide stats e.g total downloads, users etc
│   │       ├── custom_pagination.py        # Logic for role based pagination
│   │    ├── endpoint_samples/              # Contains sample endpoint requests using the Jetbrains HTTP client format
│   │    ├── migrations/                    # Django DB Migrations
│   │    ├── management/                    # Contains custom manage.py instructions
│   │    ├── templates/                     # HTML Templates used for email notifications
│   │    ├── views/                         # API endpoint defintions
│   │    ├── serializers.py                 # Serializers for relevant models
│   │    ├── *.py                           # Other python files used by the Django framework
│   ├── staticfiles/                        # Contains the static frontend files for DRF 
│   ├── manage.py                           # Used to run the Django project and perform other related actions
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── .env     
```

### Notes on project structure
- This project contains a single Django app 'ADRP'
- _service folders (in the backend_services folder) typically contain 2 files: _main.py and _repository.py
  - _main.py files contain classes which manage logic for different functionality e.g. AccountsService.get_otp would generate
  and associate an OTP with a given user
  - _repository.py files contain Database queries. They are separated from the _main.py files to keep the code DRY. Some DB queries require
  additional processing, as such we thought it best to separate them.


### How to run the backend server locally
To run the gunicorn server for the API you should:
1. CD into the project root as shown in the structure above
2. Create database migrations by typing the following in the terminal
```python manage.py makemigrations```
3. Apply database migrations with ```python mangage.py migrate```
4. Calculate site wide stats with ```python manage.py rebalancestats```
5. Run ```python manage.py collectstatic``` to build the static files needed for Django related pages
6. Finally, run the server with ```python manage.py runserver```


### Modifying API Settings
#### User related API Settings
Some of the settings that govern the general behaviour of the API can be modified in the ```settings.py``` file located in the
Django project folder (refer to the Project Structure section).

Settings that you may actually want to change include:
1. ```OTP_LIFETIME``` : The valid lifetime of a users OTP (in mins)
2. ```OTP_LENGTH``` : The number of characters in the OTP (changing this would requre changes to the frontend)
3. ```ACCESS_TOKEN_LIFETIME``` : The number of hours that an access token is live for.
4. ```REFRESH_TOKEN_LIFETIME``` : The number of hours that the refrsh token is live for. (Currently not being used)

#### Deployment config Settings
There are also some configs related to API Services that you may want to change once you are ready to deploy the app.
These include:
1. Email config and credentials for the SMTP based email notification service
2. Database config and cridentials
3. AWS bucket credentials.

All of these can be changed within the .env file


### Todo before deploying
The following checklist should be followed before the API is made publicly available:
https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/


### Current deployment config
Currently, we use Docker for deployments. The relevant ```Dockerfile``` has been provided.
It is configured to run using the WSGI server with 4 workers attached. To scale, the number of workers can be increased.


### Future Improvements
1. Currently, the statistics are re-calculated every 6 hours. This is an okay implementation, but it is possible to
implement the Statistics Service such that it is only necessary when an update to the code base is made
2. 




