//visit 테이블 정보 담기
module.exports = (sequelize, DataTypes) => (
    sequelize.define('visit', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        contents: {
            type: DataTypes.STRING, 
            allowNull: true,
        }, 
        celebration: {
            type: DataTypes.INTEGER, 
            allowNull: true,
        }, 
        password: {
            type: DataTypes.STRING, 
            allowNull: false,
        }, 
        check: {
            type: DataTypes.BOOLEAN, 
            allowNull: false,
            defaultValue: false
        }, 
    }, {
        timestamps: true, //생성일, 수정일 기록
        paranoid: true, //삭제일기록(복구용)
    })
);