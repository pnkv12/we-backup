# we-backup (Please regard branch develop for actual work)

COMP1640 - Spring 2022
Deadline: 27th April

Group 13:

- Tran Thien Trong
- Nghiem Minh Khang
- Nguyen Mai Kieu Thy
- Pham Ngoc Khanh Vy
- Chung Gia Huy
- Tran Ha Hoang Khanh

1. Google Account:

- Email: webackup2022@gmail.com
- Password: Wenotbackup2022

2. MongoDB Atlas

- Using google account to sign in MongoDB Atlas
- Access [here](https://www.mongodb.com/atlas/database).

3. Credentials (username - password)

QA Manager: manager - 123456789
Admin: admin - 123456789
Coordinator: coor - 123456
Staff: staff || staff2 - 123456

4. Setup

- Backend: https://github.com/TranHaHoangKhanh/Enterprise_Server
- Frontend: https://github.com/pnkv12/we-backup
  1. git checkout develop
  2. cd frontend
  3. npm i (if packages not yet installed. If already -> step 5)
  4. If failed to install react-notifications-menu: npm i react-notifications-menu --force
  5. npm start

5. Automation test using Cypress

//Installation: npm install cypress --save-dev//

- cd frontend
- npx cypress open

---

**Notice**

- We using Google API (Gmail API, Drive API) to send mail notification feature and store files feature in requirement.
- Go to this file: src/config/variables.js to follow the variables
- The backend has been deployed to Heroku server: https://be-enterprise.herokuapp.com

**_The note was updated on 12th April 2022_**
