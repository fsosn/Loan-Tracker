# Loan-Tracker

Loan Tracker is a full-stack web application designed for secure, peer-to-peer lending and borrowing money between
authorized users, enabling easy tracking of loans.

## Table of Contents

- [Try It Out](#live-app)
- [Security](#security)
- [Features](#features)
- [Built With](#built-with)


## Try It Out

Discover my app and access all of its features here:
[Loan Tracker](https://loan-tracker.vercel.app/)

## Security

Ensuring the security of the application was my top priority. Here are some key features:

- **Data Validation:**  
  Data validation is used to check that input data is secure and that it follows specific rules, stopping potential attacks.


- **Password Protection:**  
  Passwords are securely stored in a database, using a combination of hashing, salting and peppering.


- **Login Activity:**  
  The system monitors and tracks unsuccessful login attempts, informing users about these attempts on their accounts and enabling them to respond to any suspicious activity.


- **Progressive Delays:**  
  The system progressively delays login attempts for a specific IP after unsuccessful tries, preventing brute force attacks.


- **Secure Transmission:**  
  HTTPS protocol is used to secure data during transmission.


- **Password Management:**  
  Users have the ability to change their passwords and also recover forgotten passwords through email.


- **Password Strength Information:**  
  Users are informed about the quality of their passwords.

## Features

- **Create loans:**  
   Record new loan transactions by providing essential details such as title, amount, due date and borrower.

  <img src="/documentation/add_loan.png?raw=true" alt="add_loan" width="500"/>

- **View loans:**  
  Check the details of your recorded loans.
  
  <img src="/documentation/loans.png?raw=true" alt="loans" width="500"/>


- **Request loans:**  
  After creating a loan, the borrower receives a request for confirmation to proceed with the loan agreement.
  
  <img src="/documentation/requests.png?raw=true" alt="requests" width="500"/>


- **Viewing users' total debts:**  
  See a summarized overview of each user's total debt. 

  <img src="/documentation/users.png?raw=true" alt="users" width="500"/>


- **Monitoring login activity**  
  Track failed login attempts on your account.

  <img src="/documentation/login_activity.png?raw=true" alt="login_activity" width="500"/>


- **Creating accounts**  
  Register and set up new user accounts by providing first and last name, e-mail and password.

  <img src="/documentation/register.png?raw=true" alt="register" width="500"/>


- **Signing in**  
  Access your existing account by providing an e-mail and password.

  <img src="/documentation/login.png?raw=true" alt="login" width="500"/>


- **Changing passwords**  
  Update your account password.

  <img src="/documentation/change_password.png?raw=true" alt="change_password" width="500"/>


- **Recovering passwords**  
  Recover a lost password for continued access by providing an email, entering the recovery token from an email and 
  choosing a new password.  

  <img src="/documentation/recover_password.png?raw=true" alt="recover_password" width="500"/>
  <img src="/documentation/reset_password.png?raw=true" alt="recover_password" width="500"/>
  <img src="/documentation/password_recovery_email.png?raw=true" alt="recover_password" width="500"/>

## Built With

* ![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
* ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
* ![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
* ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)