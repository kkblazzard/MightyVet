const xl = require('excel4node');
const path = require('path');
const Users = require('../users/models');
module.exports={
    usersFile: (req, res) => {
        Users.find({}).select("-password").populate("mentor_id")
        .then(data => {
            var wb = new xl.Workbook();
            var ws = wb.addWorksheet('Sheet 1');
            ws.cell(1,1)
            .string('Total Users:');
            ws.cell(1,2)
            .number(data.length);
            ws.cell(2,1)
            .string('Email:');
            ws.cell(2,2)
            .string('Name:');
            ws.cell(2,3)
            .string('Title');
            ws.cell(2,4)
            .string('Organization:');
            ws.cell(2,5)
            .string('State:');
            ws.cell(2,6)
            .string('Number of Mentors:');
            ws.cell(2,7)
            .string('Number of Classes:');
            ws.cell(2,8)
            .string('Mentor Status:')
            for(i = 3; i < data.length + 3; i++){
                ws.cell(i, 1)
                .string(data[i-3].email)
                ws.cell(i, 2)
                .string(data[i-3].firstName+" "+data[i-3].lastName)
                ws.cell(i, 3)
                .string(data[i-3].title)
                ws.cell(i, 4)
                .string(data[i-3].org)
                ws.cell(i, 5)
                .string(data[i-3].state)
                ws.cell(i, 6)
                .number(data[i-3].mentors.length)
                ws.cell(i, 7)
                .number(data[i-3].accreditations.length)
                ws.cell(i, 8)
                .string(data[i-3].mentor_id ? (data[i-3].mentor_id.approval ? "Approved" : "Pending" ) : "No")
            }
            var string = path.join(__dirname, '../../public/src/assets/excel_files', Date.now().toString() + ".xlsx")
            wb.write(string);
            res.json({"file_url": string});
        })
        .catch(err => console.log(err) | res.json(err))
    }
}