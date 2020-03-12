/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react"
import PropTypes from "prop-types"

const propTypes = {
  items: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number,
  pageSize: PropTypes.number
}

const defaultProps = {
  initialPage: 1,
  pageSize: 5
}

class Pagination extends Component {
  constructor(props) {
    super(props)
    this.state = { pager: {} }
  }

  componentWillMount() {
    // set page if items array isn't empty
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // reset page if items array has changed
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.initialPage)
    }
  }

  setPage(page) {
    var { items, pageSize } = this.props
    var pager = this.state.pager

    if (page < 1 || page > pager.totalPages) {
      return
    }

    // get new pager object for specified page
    pager = this.getPager(items.length, page, pageSize)

    // get new page of items from items array
    var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1)

    // update state
    this.setState({ pager: pager })

    // call change page function in parent component
    this.props.onChangePage(pageOfItems)
  }

  getPager(totalItems, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1

    // default page size is 10
    pageSize = pageSize || 5

    // calculate total pages
    var totalPages = Math.ceil(totalItems / pageSize)

    var startPage, endPage
    if (totalPages <= 5) {
      // less than 5 total pages so show all
      startPage = 1
      endPage = totalPages
    } else {
      // more than 5 total pages so calculate start and end pages
      if (currentPage <= 3) {
        startPage = 1
        endPage = 5
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 4
        endPage = totalPages
      } else {
        startPage = currentPage - 2
        endPage = currentPage + 2
      }
    }

    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * pageSize
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1)

    // create an array of pages to ng-repeat in the pager control
    var pages = [...Array(endPage + 1 - startPage).keys()].map(i => startPage + i)

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    }
  }

  render() {
    var pager = this.state.pager

    if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return null
    }

    return (
      <ul class="flex pl-0 rounded list-none flex-wrap">
        <a
          type="button"
          onClick={() => this.setPage(1)}
          class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500"
        >
          {"<<"}
        </a>
        <a
          type="button"
          onClick={() => this.setPage(pager.currentPage - 1)}
          class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500"
        >
          {"<"}
        </a>
        {pager.pages.map((page, index) => (
          <a
            type="button"
            onClick={() => this.setPage(page)}
            key={index}
            class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500"
          >
            {page}
          </a>
        ))}

        <a
          type="button"
          onClick={() => this.setPage(pager.currentPage + 1)}
          class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500"
        >
          {">"}
        </a>
        <a
          type="button"
          onClick={() => this.setPage(pager.totalPages)}
          class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500"
        >
          {">>"}
        </a>
      </ul>
    )
  }
}

Pagination.propTypes = propTypes
Pagination.defaultProps = defaultProps
export default Pagination
