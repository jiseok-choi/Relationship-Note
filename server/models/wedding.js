//wedding 테이블 정보 담기
module.exports = (sequelize, DataTypes) => (
    sequelize.define('wedding', {
        date: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }, 
        time: {
            type: DataTypes.DATE, 
            allowNull: false,
        }, 
        groom: {
            type: DataTypes.STRING(50), 
            allowNull: false,
        }, 
        contents: {
            type: DataTypes.STRING, 
            allowNull: true,
        }, 
        userid: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
    }, {
        timestamps: true, //생성일, 수정일 기록
        paranoid: true, //삭제일기록(복구용)
    })
);