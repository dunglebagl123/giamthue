
 function envChangeTyLeGiamNQ43() { 

   
     // if(  $('#Pattern').val().indexOf('2/0') ==  -1 ){
     //  return
     // }  
    // $('#VATRateItem').val(-4)

     var totalPro = 0.0

     if ($('#TyLePhanTramGiam').val() == "" || $('#TyLePhanTramGiam').val().trim() == "0") {
         $('#TienGiamNQ43').val("").trigger(`change`)
         return
     }
     // tính tiền
     $('table.products tr').each((i, e) => {
         var Issum_ = $(e).find('select.Issum')
         var name_ = $(e).find('input.name')
         if (name_.val() == "")
             return

         if (Issum_.val() == "0") {
             var amount_ = $(e).find('input.amount').val().FormatNumUK()
             totalPro += Math.abs(amount_)
         }
     })
     if (totalPro == 0)
         return

     var TienGiam = Math.round( totalPro * parseFloat($('#TyLePhanTramGiam').val()) / 100  * 0.2   )
     var TienGiamSTR = TienGiam.format(0, 3, typeCurrency)  

     if($('#type') &&$('#type').val() == "3"){
        TienGiamSTR = '-'+TienGiamSTR
     }
     $('#TienGiamNQ43').val(TienGiamSTR).trigger(`change`)
 }


function TienGiamNQ43Change(argument) {
   
    var     Add = false 
    var TienGiam =  $('#TienGiamNQ43').val() 
    if(TienGiam =="" || TienGiam == "0")
    {
        $('table.products tr input.amount').eq(1).trigger('change')  
        $('#Total2').val( $('#Total').val())
    }
    else {
        $('table.products tr input.amount').eq(1).trigger('change')
        $('#Total2').val( $('#Total').val())
        var Total2 = $('#Total').val().FormatNumUK() 
        Total2 = Math.abs(Total2) - Math.abs(TienGiam.FormatNumUK() )
       
        if($('#type') && $('#type').val() == "3"){
            Total2 = ('-'+Total2).FormatNumUK() 
         }
        $('#Total').val(  Total2.format(0, 3, typeCurrency)).trigger(`change`) 
    } 

   $('table.products tr').each((i,e)=>{
        if(i==1 )
            return 

    var prName =   $(e).find('input.name')
    var prCode  =   $(e).find('input.code')
    var tchh =   $(e).find('select.Issum')

    if($('#TienGiamNQ43').val() == "" ||  $('#TienGiamNQ43').val() == "0") {
         Add = true
         if(prCode.val() == "GHICHUNQ43" ){
            prCode.val('')
            tchh.val(0)
            prName.val("") 
            return
         } 
    } 

    var strGiam = `Đã giảm ${TienGiam.replace(',00','')}đ tương ứng 20% mức tỷ lệ % để tính thuế giá trị gia tăng theo Nghị quyết số 44/2022/QH15`

     if(prCode.val() == "GHICHUNQ43" ){
        prName.val(strGiam) 
        prCode.val("GHICHUNQ43")
        Add = true
     } 

    if(Add)
        return

    if(prName.val() == "" ){
        prName.val(strGiam)
        prCode.val("GHICHUNQ43")
        tchh.val(4)
        Add = true 
     } 
    })

}
function btnGiam20Click(val) {
    if(val )
        {
            $('#TyLePhanTramGiam').val(val).trigger(`change`)
      }
      else {
         $('#TyLePhanTramGiam').val('').trigger(`change`)
      } 
}

function Giam_Thue_Hoa_Don_Ban_Hang(){
 
    if (new Date().getFullYear() > 2023) {
     console.log('TT78 - NQ44 giảm thuế chỉ dùng trong năm 2023');
     return
    }

    var hr = window.location.href 
    var host = window.location.host
    var pathname = window.location.pathname

     if(  host.indexOf('-tt78') == -1  ){  
        return
     }

     if(pathname.indexOf('/AdJust/CreateAdJustInv') != 0 
        && pathname.indexOf('/EInvoice/Edit/') != 0
        && pathname.indexOf('/EInvoice/create') != 0
        && pathname.indexOf('/AdJust/CreateReplaceInv') != 0 
         ){
        return
     }

     if(  $('#Pattern').val().indexOf('2/') !=0  ||  $('#Pattern').val().length != 5  )
      {
        return
      }  
    
 

   // if( $('#Pattern').val().indexOf('2/')==0 && $('#Pattern').val().length == 5 ){  


        $('#thueKhacId').closest('.line').after(`  
        <div class="line" style="float:right;margin-top:1em;"   > 
        <input type="button" id="btnKhongGiam" class="btn btn-flat btn-primary"  value="Không giảm"  onclick="btnGiam20Click(0)"  /> 
        <label> Giảm 20% </label> 
         <label>mức tỷ lệ </label> 
        <input type="text" id="TyLePhanTramGiam" class=" textr _number"  value="" style=" width: 4em;"  maxlength="3"  />
         <label>  % VAT ngành hàng</label> 
        </div>`) 
 //<input type="button" id="btnGiam20" class="btn btn-flat btn-primary"  value="20%"  onclick="btnGiam20Click(20)" style="min-width: 1em;"  />


        $('#Amount').closest('.line').before(`
          <div class="line " ><div class="label w180 "><label>Tổng tiền hàng</label></div>
        <div class="control">
        <input type="text"  id="Total2" class="_number textr groupTotal">
        </div></div> 

        <div class="line " ><div class="label w180 "><label>Số tiền giảm(NQ44)</label></div>
        <div class="control">
        <input type="text"  id="TienGiamNQ43" class="_number textr groupTotal" title="Tiền giảm =  Tổng tiền X 20% x  % thuế sản phẩm">
        </div></div>  `) 
    //} 


     // <input type="button" id="GiamTienThueExt" class="btn btn-flat " onclick="giamTienThueHoaDonBanHang()" 
     //    value="Giảm Tiền theo NQ43" style="float: right;"  /> 
    $('#TyLePhanTramGiam').change(function (argument) {
         envChangeTyLeGiamNQ43()
    })

     $('#TienGiamNQ43').change(function (argument) {
         TienGiamNQ43Change()
    })

     if($('#Pattern').val().indexOf('2/')==0    ){
        $('#VATAmount').closest('.line').hide()
        $('#Total').closest('.line').hide()
        $('#VATRateItem').closest('.line').hide()    
     }

      $('#Total2').val( $('#Total').val())

      $('table.products tr input.amount').change(function(){
         $('#Total2').val( $('#Total').val()) 
       })  
    }

Giam_Thue_Hoa_Don_Ban_Hang()

 //giamTienThueHoaDonBanHang()


document.addEventListener('DOMContentLoaded',function(){
   
})

window.addEventListener('DOMContentLoaded', function(e) {
     
});


