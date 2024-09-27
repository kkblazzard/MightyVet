require('http');

const secrets = require('../secrets');

// 1. api: The api key of your account.

// 2. username: The username of your account.

// 3. from: Specify a Sender email address.

// 4. to : Specify a Recipient email address.

// 5. subject : The subject of your email

// 6. message : The HTML content of your email message.

module.exports = {
    menteeSignUpNotifications: (meeting) => {
        console.log(meeting);
        var email = meeting.mentor.user.email;
        var subject = "Availability Filled";
        var content = `<h1>${meeting.mentee.firstName} ${meeting.mentee.lastName} has signed up for your mentorship on ${meeting.datetime}</h1>
        <div><a href='mailto:${meeting.mentee.email}'>Email ${meeting.mentee.firstName} ${meeting.mentee.lastName}</a></div>
        <div><a href='mightyvet.org/user/schedule'>Check your schedule</a></div>`
        var postData = `username=${secrets.dm_username}
        &api=${secrets.dm_key}
        &to=${email}
        &from=${secrets.dm_domain}
        &subject=${subject}
        &message=${content}`

        var options = {

            "method": "POST",

            "hostname": "dailymails.org",

            "port": null,

            "path": "/api/v1/mail/send/",

            headers: {

                'Content-Type': 'application/x-www-form-urlencoded',

                'Content-Length': Buffer.byteLength(postData)

            }

        };


        var req = http.request(options, function (res) {

            res.setEncoding('utf8');

            res.on("data", function (chunk) {

                console.log(chunk);

            });

            res.on("end", function () {

                console.log("completed");

            });
        });


        req.write(postData);

        req.end(() => {
            email = meeting.mentee.email;
            subject = "Mentorship Sign Up";
            content = `<h1>You have signed up for mentorship with ${meeting.mentor.user.firstName} ${meeting.mentor.user.lastName} on ${meeting.datetime}</h1>
        <div><a href='mailto:${meeting.mentor.user.email}'>Email ${meeting.mentor.user.firstName} ${meeting.mentor.user.lastName}</a></div>
        <div><a href='mightyvet.org/user/schedule'>Check your schedule</a></div>`
            postData = `username=${secrets.dm_username}
        &api=${secrets.dm_key}
        &to=${email}
        &from=${secrets.dm_domain}
        &subject=${subject}
        &message=${content}`

            var options = {

                "method": "POST",

                "hostname": "dailymails.org",

                "port": null,

                "path": "/api/v1/mail/send/",

                headers: {

                    'Content-Type': 'application/x-www-form-urlencoded',

                    'Content-Length': Buffer.byteLength(postData)

                }

            };


            var req2 = http.request(options, function (res) {

                res.setEncoding('utf8');

                res.on("data", function (chunk) {

                    console.log(chunk);

                });

                res.on("end", function () {

                    console.log("completed");

                });
            });


            req2.write(postData);

            req2.end();
        });
    },
    mentorshipNotifications: (meeting) => {
        var email = meeting.mentor.user.email;
        var subject = "Meeting Reminder";
        var content = `<h1>${meeting.mentee.firstName} ${meeting.mentee.lastName} has signed up for your mentorship on ${meeting.datetime}</h1>
        <div><a href='mailto:${meeting.mentee.email}'>Email ${meeting.mentee.firstName} ${meeting.mentee.lastName}</a></div>
        <div><a href='mightyvet.org/user/schedule'>Check your schedule</a></div>`
        var postData = `username=${secrets.dm_username}
        &api=${secrets.dm_key}
        &to=${email}
        &from=${secrets.dm_domain}
        &subject=${subject}
        &message=${content}`

        var options = {

            "method": "POST",

            "hostname": "dailymails.org",

            "port": null,

            "path": "/api/v1/mail/send/",

            headers: {

                'Content-Type': 'application/x-www-form-urlencoded',

                'Content-Length': Buffer.byteLength(postData)

            }

        };


        var req = http.request(options, function (res) {

            res.setEncoding('utf8');

            res.on("data", function (chunk) {

                console.log(chunk);

            });

            res.on("end", function () {

                console.log("completed");

            });
        });


        req.write(postData);

        req.end();
    }
}