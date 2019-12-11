# Exploring the Booking App

All of the problems for **Making HTTP Requests** use the same application.

The booking application is a tool for students to book available schedule slots for staff members. Staff provides the schedules that students can book.

## Questions 1

1. There are five staff members.
2. There are five students.
3. There are nine schedules.
4. There are three schedules with bookings.
5. No, there are two missing.
6. No.

## Prompt 2

Create a function that retrieves all of the schedules that are available. These are schedules which have a `student_email` value of `null`. 

If one or more is available, tally the count of schedules and alert the user of result as 'key:value' pairs with the `staff_id` as key and the count of schedules as the value. If there are none available, alert the user.

When there are more than 7 schedules to receive, the server slows down. If 5 seconds have passed since the query, cancel the retrieval and alert the user to try again.

