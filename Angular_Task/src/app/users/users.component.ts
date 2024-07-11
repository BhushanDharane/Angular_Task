import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommmonService } from '../commmon.service';
declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userForm: any;
  users: any[] = [];

  constructor(public fb: FormBuilder, private service: CommmonService) {
    // Initialize the userForm using FormBuilder
    this.userForm = this.fb.group({
      Name: [""],
      Salary: [""],
      Age: [""]
     
    });
  }

  ngOnInit(): void {
    // Initialization logic here
    this.GetAllUser(); // Fetch all users when component initializes
  }

  SubmitForm() {
    // Determine operation type based on whether id is present in form value
    var typeData = this.userForm.value.id == null ? 'Add' : 'Update';
    console.log(this.userForm.value);

    // Call service method to add/update user
    this.service.AddUpdateUser(this.userForm.value, typeData).subscribe(data => {
      if (typeData == 'Add') {
        alert("User Added");
      } else {
        alert('User Updated');
      }

      // Reset form, fetch all users, and log data
      this.userForm.reset();
      this.GetAllUser();
      console.log(data);
    });
  }

  GetAllUser() {
    // Fetch all users from service
    this.service.GetAllUser().subscribe(data => {
      console.log("Users", data);
      this.users = data; // Assign fetched users to local variable
    });
  }

  DeleteUserByID(id: any) {
    // Call service method to delete user by ID
    this.service.DeleteUserByID(id).subscribe(data => {
      alert("User Deleted");
      this.GetAllUser(); // Fetch all users again after deletion
    });
  }

  GetUserByID(id: any) {
    // Call service method to fetch user details by ID
    this.service.GetUserByID(id).subscribe(data => {
      console.log("User details", data);

      // Populate form fields with fetched user details
      this.userForm.patchValue({
        
        Name: data.Name,
        Salary: data.Salary,
        Age: data.Age,
        
      });

      // Use jQuery to handle Bootstrap tab navigation (just an example)
      setTimeout(() => {
        $("#nav-home").addClass('show').addClass('active');
        $("#nav-profile").removeClass('show').removeClass('active');
      }, 500);
    });
  }
}
