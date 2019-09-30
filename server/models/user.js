//user 테이블 정보 담기
module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {
        email: {
            type: DataTypes.STRING(40),
            allowNull: true,
            unique: true,
        }, 
        userid: {
            type: DataTypes.STRING(20), 
            allowNull: true,
            unique: true,
        }, 
        password: {
            type: DataTypes.STRING(100),
            allowNull: true, //카카오일시 필수가 아니어도되니 false
        }, 
        name: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
    }, {
        timestamps: true, //생성일, 수정일 기록
        paranoid: true, //삭제일기록(복구용)
    })
);