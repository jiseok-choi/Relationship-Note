import React, { Component } from "react"
import Loginform from "./Loginform"
import axios from "axios"
import { Container, Row, Col, Image } from "react-bootstrap"
import { money, visit, meeting, birth, friend } from "../images"
import { BrowserRouter, Route, Switch, Link } from "react-router-dom"
import Signup from "./Signup"

class joinindex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      message: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.sendmail = this.sendmail.bind(this)
  }

  sendmail = e => {
    e.preventDefault()
    const { name, email, message } = this.state
    if (name === "" || email === "" || message === "") {
      return alert("모든 항목을 작성해주세요")
    }
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    if (!emailRegexp.test(email)) {
      return alert("이메일 형식을 지켜주세요")
    }

    axios
      .post(`http://localhost:8000/auth/mail`, {
        name: this.state.name,
        email: this.state.email,
        message: this.state.message
      })
      .then(res => {
        alert("질문 감사합니다 응답은 메일로 보내드립니다")
        window.location.reload()
      })
      .catch(err => {
        console.error(err)
      })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <>
        <main>
          <div
            className="relative pt-16 pb-32 flex content-center items-center justify-center"
            style={{
              minHeight: "75vh"
            }}
          >
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')"
              }}
            >
              <span id="blackOverlay" className="w-full h-full absolute opacity-75 bg-black"></span>
            </div>
            <div className="container relative mx-auto">
              <div className="items-center flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                  <div className="pr-12">
                    <h1 className="text-white font-semibold text-5xl">
                      당신과 지인들의 소중한 관계를 위하여.
                    </h1>
                    <p className="mt-4 text-lg text-gray-300">
                      살다보면 인간관계를 위한 노트가 필요한 경우가 종종 있습니다. 소중한 상대방과의
                      관계를 긍정적으로 만들어가기 위해서 Relaitonship notes 일명 R_NOTE를
                      사용해보세요.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
              style={{ height: "70px", transform: "translateZ(0)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-gray-300 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </div>

          <section className="pb-20 bg-gray-300 -mt-24">
            <div className="container mx-auto px-4">
              <div className="flex justify-center">
                <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                        <i className="fas fa-award"></i>
                      </div>
                      <h6 className="text-xl font-semibold">회원가입</h6>
                      <p className="mt-2 mb-4 text-gray-600">
                        R_NOTE 가 처음이신가요? <br />
                        지금바로 회원가입하시고 이용하세요.
                      </p>
                      <p className="flex justify-center mt-6">
                        <Signup />
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-400">
                        <i className="fas fa-fingerprint"></i>
                      </div>
                      <h6 className="text-xl font-semibold">로그인</h6>
                      <p className="mt-6">
                        <Loginform />
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center mt-32">
                <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                  <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-100">
                    <i className="fas fa-user-friends text-xl"></i>
                  </div>
                  <h3 className="text-3xl mb-2 font-semibold leading-normal">
                    Friend relationship management
                  </h3>
                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
                    자신의 지인들을 등록하고 관리해보세요 소중한 가족, 친구 등 여러 관계를 당신의
                    기준에 맞추어 한눈에 볼 수 있습니다.
                  </p>
                  <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700">
                    친구 및 지인의 소식을 등록하고 일정을 만들어 캘린더로 확인 할 수 있으며 생일이나
                    중요한 날을 놓치지 않기를 바랍니다!
                  </p>
                  <a
                    href="https://www.creative-tim.com/framework/tailwind-starter-kit"
                    className="font-bold text-gray-800 mt-8"
                  >
                    Check Tailwind Starter Kit!
                  </a>
                </div>

                <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-pink-600">
                    <img
                      alt="..."
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
                      className="w-full align-middle rounded-t-lg"
                    />
                    <blockquote className="relative p-8">
                      <svg
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 583 95"
                        className="absolute left-0 w-full block"
                        style={{
                          height: "95px",
                          top: "-94px"
                        }}
                      >
                        <polygon
                          points="-30,95 583,95 583,65"
                          className="text-pink-600 fill-current"
                        ></polygon>
                      </svg>
                      <img
                        alt="..."
                        src="images/index_diary1.png"
                        className="w-full align-middle rounded-t-lg"
                      />
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="relative py-20">
            <div
              className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
              style={{ height: "80px", transform: "translateZ(0)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-white fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>

            <div className="container mx-auto px-4">
              <div className="items-center flex flex-wrap">
                <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                  <img
                    alt="..."
                    className="max-w-full rounded-lg shadow-lg"
                    src="images/index_party.jpg"
                  />
                </div>
                <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                  <div className="md:pr-12">
                    <div className="text-pink-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-pink-300">
                      <i className="fas fa-rocket text-xl"></i>
                    </div>
                    <h3 className="text-3xl font-semibold">Create an event and greet guests</h3>
                    <p className="mt-4 text-lg leading-relaxed text-gray-600">
                      당신의 행사를 만들고 사람들을 초대하세요! 당신이 주최한 행사에 초대된 사람들을
                      한눈에 볼 수 있습니다.
                    </p>
                    <ul className="list-none mt-6">
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                              <i className="fas fa-fingerprint"></i>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-gray-600">
                              결혼식 등 여러 행사의 초청장 자동 생성
                            </h4>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                              <i className="fab fa-html5"></i>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-gray-600">QR code로 방명록 작성하기</h4>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                              <i className="far fa-paper-plane"></i>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-gray-600">행사별 축의금 관리 기능</h4>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="pt-20 pb-48">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center text-center mb-2">
                <div className="w-full lg:w-8/12 px-4">
                  <h2 className="text-4xl font-semibold">Who created by this site</h2>
                  <p className="text-lg leading-relaxed m-4 text-gray-600">
                    더 좋은 서비스를 고민하고 더 좋은 개발자가 되기를 꿈꾸는
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center">
                <div className="w-full md:w-6/12 lg:mb-0 mb-12 px-4">
                  <div className="px-6">
                    <img
                      alt="..."
                      src="./images/root_profile.jpg"
                      className="shadow-lg rounded-full max-w-full mx-auto"
                      style={{ maxWidth: "360px" }}
                    />
                    <div className="pt-6 text-center">
                      <h5 className="text-xl font-bold">Jiseok CHOI</h5>
                      <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                        Web Developer
                      </p>
                      <div className="mt-6">
                        <button
                          className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-dribbble"></i>
                        </button>
                        <button
                          className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-google"></i>
                        </button>
                        <button
                          className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-twitter"></i>
                        </button>
                        <button
                          className="bg-gray-800 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-instagram"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="pb-20 relative block bg-gray-900">
            <div
              className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
              style={{ height: "80px", transform: "translateZ(0)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-gray-900 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>

            <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
              <div className="flex flex-wrap text-center justify-center">
                <div className="w-full lg:w-6/12 px-4">
                  <h2 className="text-4xl font-semibold text-white">What is it made of</h2>
                  <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
                    R_NOTE를 만든 기술은 크게 3가지가 있습니다
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap mt-12 justify-center">
                <div className="w-full lg:w-3/12 px-4 text-center">
                  <div className="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                    <i className="fas fa-medal text-xl"></i>
                  </div>
                  <h6 className="text-xl mt-5 font-semibold text-white">Front End</h6>
                  <p className="mt-2 mb-4 text-gray-500">REACT</p>
                </div>
                <div className="w-full lg:w-3/12 px-4 text-center">
                  <div className="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                    <i className="fas fa-poll text-xl"></i>
                  </div>
                  <h5 className="text-xl mt-5 font-semibold text-white">Back End</h5>
                  <p className="mt-2 mb-4 text-gray-500">NODE-JS</p>
                </div>
                <div className="w-full lg:w-3/12 px-4 text-center">
                  <div className="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                    <i className="fas fa-lightbulb text-xl"></i>
                  </div>
                  <h5 className="text-xl mt-5 font-semibold text-white">Other</h5>
                  <p className="mt-2 mb-4 text-gray-500">AWS</p>
                </div>
              </div>
            </div>
          </section>
          <section className="relative block py-24 lg:pt-0 bg-gray-900">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300">
                    <div className="flex-auto p-5 lg:p-10">
                      <h4 className="text-2xl font-semibold">질문있으십니까?</h4>
                      <p className="leading-relaxed mt-1 mb-4 text-gray-600">
                        어떤 내용과 상관없습니다 회신을 위한 메일을 기재해 주세요.
                      </p>
                      <div className="relative w-full mb-3 mt-8">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="full-name"
                        >
                          이름
                        </label>
                        <input
                          type="text"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                          placeholder="Full Name"
                          style={{ transition: "all .15s ease" }}
                          name="name"
                          onChange={this.handleChange}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="email"
                        >
                          이메일
                        </label>
                        <input
                          type="email"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                          placeholder="example@test.com"
                          style={{ transition: "all .15s ease" }}
                          name="email"
                          onChange={this.handleChange}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="message"
                        >
                          메세지
                        </label>
                        <textarea
                          rows="4"
                          cols="80"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                          placeholder="Type a message"
                          name="message"
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="text-center mt-6">
                        <button
                          onClick={this.sendmail}
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    )
  }
}

export default joinindex
