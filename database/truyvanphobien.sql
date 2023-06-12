--1. Cho biết các món ăn bán chạy nhất trong hôm nay
select f.Food_Name from Food_Order f join Orders o on o.ID_Order=f.ID_Order
where getdate()=o.Date_Order
group by f.Food_Name
having count(*)>= all (select f.Food_Name from Food_Order f join Orders o on o.ID_Order=f.ID_Order
where getdate()=o.Date_Order 
group by f.Food_Name)
--2. Cho biết các món ăn bán được ít nhất trong hôm nay
select f.Food_Name from Food_Order f join Orders o on o.ID_Order=f.ID_Order
where getdate()=o.Date_Order
group by f.Food_Name
having count(*)<= all (select f.Food_Name from Food_Order f join Orders o on o.ID_Order=f.ID_Order
where getdate()=o.Date_Order 
group by f.Food_Name)
--3. Cho biết các bình luận của món bán chạy nhất hôm nay
select f.Feedback from Feedback f
where f.Food_Name in (select f.Food_Name from Food_Order f join Orders o on o.ID_Order=f.ID_Order
where getdate()=o.Date_Order
group by f.Food_Name
having count(*)>= all (select f.Food_Name from Food_Order f join Orders o on o.ID_Order=f.ID_Order
where getdate()=o.Date_Order 
group by f.Food_Name))
--4. Cho biết tất cả các món sườn nướng của các cửa hàng
select * from menu where Food_Name=N'sườn nướng'
--5. Cho biết tất cả các món ăn hiện có
select * from menu
--6. cho biết các món ăn có giá <= 30000đ
select * from menu where Price <=30000