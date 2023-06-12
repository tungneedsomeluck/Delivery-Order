function handleChoosePartner(d) {
    console.log(d)
    $.ajax({
        url: '/client/restaurant',
        type: 'GET',
        data: {
            
        },
         // Nếu thành công thì hiển thị kết quả ra trình duyệt
        success: function (response) {
            console.log(response)
        },
        error: function (error) {
            console.log(error);
        }
     });
}

function handleAddToCard(a) {
    const c = document.getElementById(a);
    console.log(c.querySelector('#FoodsQuantity'));
    console.log($('input'))
}