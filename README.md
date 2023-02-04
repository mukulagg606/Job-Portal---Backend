# Job-Portal---Backend

//REGISTERING A USER=
curl --location --request POST 'http://localhost:4000/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"mukul",
    "email":"mukul@gmail.com",
    "phoneNo":"1234567890"
}'

//SENDING LOGIN OTP TO USER PHONE NUMBER=
curl --location --request POST 'http://localhost:4000/sendloginotp' \
--header 'Content-Type: application/json' \
--data-raw '{
    "phoneNo":"1234567890"
}'

//VERIFYING OTP=
curl --location --request POST 'http://localhost:4000/verify' \
--header 'Content-Type: application/json' \
--data-raw '{
    "otp":"410140",
    "phoneNo":"1234567890"
}'

//UPDATING USER's PROFILE=
curl --location --request POST 'http://localhost:4000/updateprofile' \
--header 'Authorization: BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2RlNDdhYTdlMWJhZGM0ODM0ODBlMGIiLCJpYXQiOjE2NzU1MTE5NDAsImV4cCI6MTY3NTU1NTE0MH0.mXG2zRFwSJO-inATqXtuCjZo_HraBkgt7PwpCAziM2k' \
--header 'Content-Type: application/json' \
--data-raw '{
    "general_info":{
        "full_name":"mukul aggarwal",
        "headline":"engineer"
    },
    "experienceList":[{
        "company_name":"self",
        "position":"junior",
        "used_skills":["node","express"],
        "date_of_resigning":"2023-02-04"
    },{
        "company_name":"self-placed",
        "position":"senior"
    }],
    "skils":{
        "skills_name":["node","express"],
        "years_of_experience":2
    },
    "projectList":[
        {
            "project-title":"a",
            "project-duration":"2months"
        },
        {
            "project-title":"b",
            "project_url":"qwerty"
        }
        ],
        "certificatesList":[
            {
                "license_name":"training",
                "certificate_link":"qwerty"
            },
            {
                "license_name":"training2",
                "certificate_link":"qwe"
            }
        ],
        "coursesList":[
            {
                "course_name":"name"
            },
            {
                "course_name":"course",
                "course_issuing_organisation":"abcd"
            }
        ],
        "contact_info":{
            "skype_id":"qwertyy"
        }
    
}'

//GET USER PROFILE DETAILS=
curl --location --request GET 'http://localhost:4000/getuserprofile' \
--header 'Authorization: BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2RlNDdhYTdlMWJhZGM0ODM0ODBlMGIiLCJpYXQiOjE2NzU1MTE5NDAsImV4cCI6MTY3NTU1NTE0MH0.mXG2zRFwSJO-inATqXtuCjZo_HraBkgt7PwpCAziM2k'
