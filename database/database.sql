create database ABCDElivery
go

use ABCDElivery
go

create table Login(
	ID_Log char(10),
	UserID char(10),
	Username char(20),
	Password varchar(100),
	Role nvarchar(20),

	constraint pk_Log primary key (ID_Log)
)

create table Person (
	ID_Person char(10),
	Name nvarchar(50),
	Email char(20),
	Phone char(10),
	Address nvarchar(100),
	Role nvarchar(50),
	constraint pk_Person primary key (ID_Person)
)

create table Admin (
	ID_Person char(10),
	constraint pk_Admin primary key (ID_Person)
)

create table Partner (
	ID_Person char(10),
	Deputy nvarchar(50),
	City nvarchar(40),
	District nvarchar(40),
	Total_Branches int,
	ID_Revenue char(8),
	constraint pk_Partner primary key (ID_Person)
)

create table Customer (
	ID_Person char(10),
	constraint pk_Customer primary key (ID_Person)
)

create table Driver (
	ID_Person char(10),
	License_Plate char(11),
	Identity_Card char(9),
	Tax_Fee money,
	Area char(4),
	ID_Revenue char(8),
	constraint pk_Driver primary key (ID_Person)
)

create table Employee (
	ID_Person char(10),
	constraint pk_Employee primary key (ID_Person)
)

create table Area(
	ID_Area char(4),
	Province nvarchar(20),
	District nvarchar(20),
	Street nvarchar(20),

	constraint pk_Area primary key (ID_Area)
)

create table Revenue (
	ID_Revenue char(8),
	UserName nvarchar(40),
	Reiceipts money,
	Payment money,
	
	constraint pk_Revenue primary key (ID_Revenue)
)

create table Contract (
	ID_Contract char(10),
	ID_Tax char(4),
	Deputy nvarchar(50),
	Total_Regis_Branches int,
	Effective_Time time,
	Percent_Commision float,
	Date_Contract date,
	ID_Revenue char(8),
	ID_Manager char(10),
	ID_Partner char(10),

	constraint pk_Contract primary key (ID_Contract)
)

create table Contract_Address(
	ID_Contract char(10),
	ID_New_Branches char(4), --ID_Branches before adding to table Branches
	Address nvarchar(50),

	constraint pk_Contract_Address primary key (ID_Contract, ID_New_Branches, Address)
)

create table Branches (
	ID_Branches char(4),
	Name nvarchar(50),
	Total_OrdersPerDay int,
	Address nvarchar(50),
	Status nvarchar(50),
	Time_Working time,
	Last_Change_Name date,
	ID_Owner char(10),
	Food_Type nvarchar(50),

	constraint pk_Branches primary key (ID_Branches)
)

create table Cuisine(
	ID_Branches char(4),
	Type_Cuisine nvarchar(50),
	
	constraint pk_Cuisine primary key (ID_Branches,Type_Cuisine)
)

create table Menu (
	ID_Menu char(4),
	Food_Name nvarchar(80),
	Description nvarchar(100),
	Price money,
	status nvarchar(50),
	ID_Branches char(4),
	
	constraint pk_Menu primary key (ID_Menu, Food_Name)
)

create table Feedback (
	ID_Menu char(4),
	STT int,
	Food_Name nvarchar(80),
	Feedback nvarchar(100),
	constraint pk_Feedback primary key (ID_Menu, STT, Food_Name)
)

create table Orders (
	ID_Order char(4),
	Total_Quantity int,
	Method_Payment nvarchar(50),
	Status nvarchar(50),
	Product_fees money,
	Shipping_fee money,
	Delivery_Address nvarchar(100),
	Date_Order date,
	ID_Customer char(10),
	ID_Branches char(4),
	ID_Driver char(10),
	constraint pk_Orders primary key(ID_Order)
)

create table Food_Order(
	ID_Order char(4),
	ID_Menu char(4),
	Food_Name nvarchar(80),
	Quantity int,
	Optional nvarchar(100),

	constraint pk_Food_Order primary key (ID_Order, ID_Menu, Food_Name)
)

-- Foreign Key
-- ADMIN(ID_Person) -> Person(ID_Person)
ALTER TABLE Admin
ADD CONSTRAINT FK_Admin
FOREIGN KEY (ID_Person)
REFERENCES Person(ID_Person)

-- Partner(ID_Person) -> Person(ID_Person)
ALTER TABLE Partner
ADD CONSTRAINT FK_Partner
FOREIGN KEY (ID_Person)
REFERENCES Person(ID_Person)

---- Partner(ID_Revenue) -> Revenue(ID_Revenue)
ALTER TABLE Partner
ADD CONSTRAINT FK_Partner_Revenue
FOREIGN KEY (ID_Revenue)
REFERENCES Revenue(ID_Revenue)

-- Customer(ID_Person) -> Person(ID_Person)
ALTER TABLE Customer
ADD CONSTRAINT FK_Customer
FOREIGN KEY (ID_Person)
REFERENCES Person(ID_Person)

-- Driver(ID_Person) -> Person(ID_Person)
ALTER TABLE Driver
ADD CONSTRAINT FK_Driver
FOREIGN KEY (ID_Person)
REFERENCES Person(ID_Person)

-- Driver(ID_Revenue) -> Revenue(ID_Revenue)
ALTER TABLE Driver
ADD CONSTRAINT FK_Driver_Revenue
FOREIGN KEY (ID_Revenue)
REFERENCES Revenue(ID_Revenue)

-- Driver(Area) -> Area(ID_Area)
ALTER TABLE Driver
ADD CONSTRAINT FK_Area
FOREIGN KEY (Area)
REFERENCES Area(ID_Area)

-- Employee(ID_Person) -> Person(ID_Person)
ALTER TABLE Employee
ADD CONSTRAINT FK_Employee
FOREIGN KEY (ID_Person)
REFERENCES Person(ID_Person)

-- Contract(ID_Revenue) -> Revenue(ID_Revenue)
ALTER TABLE Contract
ADD CONSTRAINT FK_Contract_Revenue
FOREIGN KEY (ID_Revenue)
REFERENCES Revenue(ID_Revenue)

-- Contract(ID_Manager) -> Employee(ID_Person)
ALTER TABLE Contract
ADD CONSTRAINT FK_Contract_Manager
FOREIGN KEY (ID_Manager)
REFERENCES Employee(ID_Person)

-- Contract(ID_Partner) -> Partner(ID_Partner)
ALTER TABLE Contract
ADD CONSTRAINT FK_Contract_Partner
FOREIGN KEY (ID_Partner)
REFERENCES Partner(ID_Person)

--Contract_Address(ID_Contract) -> Contract(ID_Contract)
ALTER TABLE Contract_Address
ADD CONSTRAINT FK_Contract
FOREIGN KEY (ID_Contract)
REFERENCES Contract(ID_Contract)

--Branches(ID_Owner) -> Partner(ID_Person)
ALTER TABLE Branches
ADD CONSTRAINT FK_Branches_Owner
FOREIGN KEY (ID_Owner)
REFERENCES Partner(ID_Person)

--Cuisine(ID_Branches) -> Branches(ID_Branches)
ALTER TABLE Cuisine
ADD CONSTRAINT FK_Cuisine
FOREIGN KEY (ID_Branches)
REFERENCES Branches(ID_Branches)

--Menu(ID_Branches) -> Branches(ID_Branches)
ALTER TABLE Menu
ADD CONSTRAINT FK_Menu_Branches
FOREIGN KEY (ID_Branches)
REFERENCES Branches(ID_Branches)

--Feedback(ID_Menu, Food_Name) -> Menu(ID_Menu, Food_Name)
ALTER TABLE Feedback
ADD CONSTRAINT FK_Feedback
FOREIGN KEY (ID_Menu, Food_Name)
REFERENCES Menu(ID_Menu, Food_Name)

--Orders(ID_Customer) -> Customer(ID_Person)
ALTER TABLE Orders
ADD CONSTRAINT FK_Orders_Customer
FOREIGN KEY (ID_Customer)
REFERENCES Customer(ID_Person)

--Orders(ID_Driver) -> Driver(ID_Person)
ALTER TABLE Orders
ADD CONSTRAINT FK_Orders_Driver
FOREIGN KEY (ID_Driver)
REFERENCES Driver(ID_Person)

--Orders(ID_Branches) -> Branches(ID_Branches)
ALTER TABLE Orders
ADD CONSTRAINT FK_Orders_Branches
FOREIGN KEY (ID_Branches)
REFERENCES Branches(ID_Branches)

--Food_Order(ID_Order) -> Orders(ID_Order)
ALTER TABLE Food_Order
ADD CONSTRAINT FK_Food_Order_ID
FOREIGN KEY (ID_Order)
REFERENCES Orders(ID_Order)

--Food_Order(ID_Menu, Food_Name) -> Menu(ID_Menu, Food_Name)
ALTER TABLE Food_Order
ADD CONSTRAINT FK_Food_Order_Menu
FOREIGN KEY (ID_Menu, Food_Name)
REFERENCES Menu(ID_Menu, Food_Name)
go

-------------------------------------------------------------------------------------------------------
create proc sp_Status_Branches(
	@ID_Person char(10),
	@ID_Branches char(4),
	@Status nvarchar(50)
)
as
begin transaction
	begin try
		if(@Status <> N'Bình thường' and @Status <> N'Đang bận' and @Status <> N'Tạm nghỉ')
		begin
			rollback transaction
			return 1
		end
	end try
	begin catch
		print(N'Thông tin không hợp lệ')
	end catch

	update Branches
	set Status = @Status
	where ID_Owner = @ID_Person
	and ID_Branches = @ID_Branches
commit transaction
go

create proc sp_Branches_Time_Working(
	   @ID_Person char(10),
	   @ID_Branches char(4),
	   @Time time
)
as
begin transaction
	 update Branches
	 set Time_Working= @time
	 where ID_Owner= @ID_Person 
	 and ID_Branches= @ID_Branches
commit transaction
go

create proc sp_change_Name(
	@ID_Person char(10),
	@ID_Branches char(4),
	@new_name nvarchar(50)
)
as
begin transaction
	update Branches
	set Name = @new_name, Last_Change_Name = getdate()
	where ID_Branches = @ID_Branches
	and ID_Owner = @ID_Person

commit transaction
go

--function Kiểm tra mã hóa đơn có tồn tại
create function isExist_Orders(
	@ID_Order char(4)
)
returns bit
as
begin
	if(exists(select ord.ID_Order
			  from Orders ord
			  where ord.ID_Order = @ID_Order))
	begin
		return 1
	end
	return 0
end
go
create proc sp_Cancel_Order(
	@ID_Order char(4)
)
as
begin tran
	begin try
		if(dbo.isExist_Orders(@ID_Order) = 0)
		begin
			rollback tran
			return 1
		end
	end try
	begin catch
		print(N'Thông tin không hợp lệ')
	end catch

	declare @status nvarchar(50)
	select @status = ord.Status
	from Orders ord
	where ord.ID_Order = @ID_Order

	if(@status = N'Đang giao' or @status = N'Đã giao')
	begin
			print(N'Không thể hủy đơn')
	end
	else
	begin
		delete from Food_Order where ID_Order = @ID_Order
		delete from Orders where ID_Order = @ID_Order
	end
commit tran
go



---------------
--Thủ tục thêm chủ
create proc sp_Add_Partner(
	@ID_Person char(10),
	@Name nvarchar(50),
	@Email char(20),
	@Phone char(10),
	@Address nvarchar(100),
	@Deputy nvarchar(50),
	@City nvarchar(40),
	@District nvarchar(40)
)
as
begin transaction
	insert into Person 
	values(@ID_Person, @Name, @Email, @Phone, @Address, N'Partner')
	insert into Partner
	values(@ID_Person, @Deputy, @City, @District, null, null)
commit transaction
go

create proc sp_Add_Branches(
	@ID_Branches char(4),
	@Name nvarchar(50),
	@OrdersPerDay int,
	@Address nvarchar(50),
	@ID_Owner char(10),
	@FoodType nvarchar(50)
)
as
begin transaction
	insert into Branches
	values(@ID_Branches, @Name, @OrdersPerDay, @Address, N'Bình thường', '07:30:00', getdate(), @ID_Owner, @FoodType)
commit transaction
go

create proc sp_Add_Menu(
	@ID_Menu char(4),
	@FoodName nvarchar(80),
	@Desc nvarchar(100),
	@Price money,
	@ID_Branches char(4)
)
as
begin transaction
	declare @result int
	set @result = (select COUNT(*) from Menu where ID_Branches = @ID_Branches)
	if(@result > 1) 
	begin
		begin try
			if(not exists (select * from Menu where ID_Branches = @ID_Branches and ID_Menu = @ID_Menu))
			begin
				rollback transaction
				return 1
			end
		end try
		begin catch
			print(N'Thông tin không hợp lệ')
		end catch
	end
	insert into Menu
	values(@ID_Menu, @FoodName, @Desc, @Price, N'Có bán', @ID_Branches)
commit transaction
go
--Thủ thục thêm người dùng
create proc sp_Add_Customer(
	@ID_Person char(10),
	@Name nvarchar(50),
	@Email char(20),
	@Phone char(10),
	@Address nvarchar(100)
)
as
begin transaction
	insert into Person 
	values (@ID_Person, @Name, @Email, @Phone, @Address, 'Customer')
	insert into Customer 
	values (@ID_Person)
commit transaction
go


--Thêm chủ
exec sp_Add_Partner 'PA0001', N'Phạm Lãi', 'laiPham@gmail.com', '0123456789', N'Dĩ An, Bình Dương', N'Ngô Phù Sai', N'TP Hồ Chí Minh', N'Quận 3' 
go

--Thêm của hàng cho chủ (một chủ có nhiều cửa hàng)
exec sp_Add_Branches 'B001', N'Cơm tấm Ngô Quyền', 100, N'Đường vành đai', 'PA0001', N'Cơm, món khác'
go
exec sp_Add_Branches 'B002', N'Cơm tấm Ngô Quyền 2', 100, N'Đối diện KHTN', 'PA0001', N'Cơm, món khác'
go
--Thêm món ăn vào cửa hàng (một của hàng có 1 menu, 1 menu có nhiều món ăn) 
--Lưu ý: 1 ID_Menu tương ứng với 1 ID_Branches
exec sp_Add_Menu 'M001', N'Sườn nướng', null, 25000,'B001'
go
exec sp_Add_Menu 'M001', N'Đùi gà chiên', null, 25000,'B001'
go
exec sp_Add_Menu 'M001', N'Cơm chiên dương châu', null, 25000,'B001'
go
exec sp_Add_Menu 'M001', N'Cơm chiên hải sản', null, 25000,'B001'
go

ALTER TABLE dbo.Person ALTER COLUMN Phone CHAR(20)
ALTER TABLE dbo.Area ALTER COLUMN Street CHAR(30)
go

--Thêm login cho chủ để test hệ thống
insert into Login 
values(1, 'PA0001', 'partner01', 'c7d812dec40bb64b3a9acf33521c60e8362035a0d0f1637a4615a0b674f0c99c1851eaa4ba5', 'Partner')
insert into Login 
values(2, 'PA0002', 'driver01', '846026173575ecab8034244f37d08e0bec25cc1757fb6e166804ad67a2b88e851854408cfc0', 'Driver')
insert into Login 
values(3, 'PA0003', 'employee01', '46f21e9c3d2737ce4a609022e6cc8adf41198236bfef63c95104d4760bf99ad81854408fc15', 'Employee')
insert into Login 
values(4, 'PA0004', 'admin', '188c6438f7a0433960aec8935a125669b09e2dd127dd60242510b2372f613a5018544092f04', 'Admin')

go








