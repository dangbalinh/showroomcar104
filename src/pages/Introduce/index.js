import style from "./Introduce.module.css"

function Introduce() {
    return ( 
        <div className={style.introBackground}>
            <div className={style.introContent}>
                <p className={style.introTitle1}>
                    <span>KING SPEED</span>
                </p> 
                <p className={style.content}>
                    Lời đầu tiên cho phép King Speed Việt Nam được gửi tới quý khách hàng của King Speed 
                    một lời chào trân trọng, lời chúc sức khỏe, an khang và thịnh vượng. 
                    King Speed Việt Nam là thành viên của tập đoàn THACO là nhà nhập khẩu 
                    ủy quyền chính thức của tâp đoàn King Speed tại Việt Nam, cung cấp xe 
                    hơi King Speed  chính hãng và các dịch vụ liên quan đến xe King Speed 
                    nhằm thỏa mãn nhu cầu sử dụng các thương hiệu cao cấp đang tăng trưởng 
                    tại Việt Nam. Việt Nam là một trong những thị trường đang tăng trưởng quan 
                    trọng nhất của tập đoàn King Speed trong khu vực. Vì vậy, chúng tôi đã 
                    khẳng định thêm vị thế của King Speed trong trị trường bằng cách phát 
                    triển liên tục mạng lưới bán hàng và dịch vụ để đáp ứng nhu cầu hiện tại 
                    và tương lai. Liên tục tìm kiếm các cơ hội kinh doanh và tiềm năng phát triển, 
                    chúng tôi hiểu sự phát triển nhanh chóng của thị trường xe hơi tại Việt Nam và 
                    nắm bắt cơ hội của thị trường này.
                </p> 
                <div>
                    <img alt="Hình ảnh showroom" className={style.showroomImg} src="https://firebasestorage.googleapis.com/v0/b/kingspeed-1ee63.appspot.com/o/Introduction%2Fshowroomcar.jpg?alt=media&token=b93ba144-d9b4-49b7-ac83-4fb107a1a7cf"></img>
                </div>
                <p className={style.introTitle1}>
                    TẦM NHÌN, SỨ MỆNH PHỤC VỤ, GIÁ TRỊ
                </p>  
                <p className={style.content}>
                    <p className={style.introTitle2}>
                        Tầm nhìn
                    </p>
                    <p className={style.content2}>
                        Sáng tạo trong tiếp thị, chiến lược bán hàng và dịch vụ hậu bán hàng xuất sắc
                        để duy trì thị phần, quảng bá hình ảnh đặc biệt và sang trọng của King Speed 
                        tại Việt Nam.
                    </p>                  
                    <p className={style.introTitle2}>
                        Sứ mệnh phục vụ
                    </p>
                    <p className={style.content2}>
                    Để hiện thực hóa tầm nhìn trên chúng tôi luôn trung thành với những giá trị cốt lõi như:<br></br><br></br>
                        – Uy tín: Thực hiện đúng và cao hơn những cam kết với khách hàng, đối tác.<br></br>
                        – Năng lực: Tập hợp, huấn luyện và phát triển năng lực nhân sự.<br></br>
                        – Chia sẻ: Chia sẻ lợi ích với đối tác, khách hàng, nhân sự và xã hội.<br></br>
                        – Hệ thống: Hệ thống quản trị khoa học, hiện đại và luôn đổi mới để hoàn thiện.<br></br>
                        – Trung: Trung thực và minh bạch trong các hoạt động, trung thành và theo đuổi mục tiêu tới cùng.
                    </p>
                    <p className={style.introTitle2}>
                        Giá trị
                    </p>
                    <p className={style.content2}>
                        Vì tất cả những sản phẩm cũng như dịch vụ trên mà King Speed Việt Nam chúng tôi 
                        đem tới cho khách hàng, chúng tôi tin tưởng rằng, quý khách hàng sẽ thật sự hài 
                        lòng khi sử dụng sản phẩm và dịch vụ của King Speed tại Việt Nam.
                    </p> 
                </p>  
                <div className={style.employeeImg}>
                    <img alt="Hình ảnh nhân viên giới thiệu xe cho khách" src="https://firebasestorage.googleapis.com/v0/b/kingspeed-1ee63.appspot.com/o/Introduction%2Fsalecar1.jpg?alt=media&token=dc0e6fd8-1486-4d68-ab52-473883664258"/>   
                    <img alt="Hình ảnh nhân viên trong showroom" src="https://firebasestorage.googleapis.com/v0/b/kingspeed-1ee63.appspot.com/o/Introduction%2Femoloyee1.jpg?alt=media&token=41f611c4-bb89-4bb9-bd0f-f8338792c97f"/>
                    <img alt="Hình ảnh nhân viên giới thiệu xe cho khách" src="https://firebasestorage.googleapis.com/v0/b/kingspeed-1ee63.appspot.com/o/Introduction%2Fsalecar2.jpg?alt=media&token=0fb8bf7f-976f-4c6f-85f7-7fcd8fec8422"/>
                </div>    
            </div>
        </div>
     );
}

export default Introduce;