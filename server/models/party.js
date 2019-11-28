//party 테이블 정보 담기
module.exports = (sequelize, DataTypes) => (
    sequelize.define('party', {
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        }, 
        time: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        mainCharacter: {
            type: DataTypes.STRING, 
            allowNull: false,
        }, 
        title: {
            type: DataTypes.STRING, 
            allowNull: true,
        }, 
        invite: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mainPicture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        subPicture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lat: {
            type: DataTypes.STRING(120),
            allowNull: true,
        },
        lng: {
            type: DataTypes.STRING(120),
            allowNull: true,
        },
        post: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
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