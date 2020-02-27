import React, { Component } from 'react';
import _ from 'lodash';
/* State를 갖지 않고 값 반환만 하는 컴포넌트이므로 함수형으로 구현 */
const Pagenation = (props) => {
    const { itemsCount, pageSize } = props; // 각각 아이템(목록) 개수, 한 페이지에 보여줄 아이템(목록) 개수
    const pageCount = Math.ceil(itemsCount / pageSize); // 몇 페이지가 필요한지 계산
    // const pageCount = 10; // 몇 페이지가 필요한지 계산

    if(pageCount === 1) return null; // 1페이지 뿐이라면 페이지 수를 보여주지 않음
    const pages = _.range(1, pageCount + 1); // 마지막 페이지에 보여줄 컨텐츠를 위해 +1, https://lodash.com/docs/#range 참고

    return (
        <nav className="pagination-sm d-flex justify-content-center">
            <ul className="pagination">
                {pages.map(page => (
                    <li className="page-item" style={{ cursor: "pointer" }}>
                        <a className="page-link">{page}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagenation;
