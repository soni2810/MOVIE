import React, { useEffect, useState } from "react";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [log, setLog] = useState([]);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const getUsers = async () => {
    const response = await fetch("https://api.tvmaze.com/shows");
    setMovies(await response.json());
    // console.log(setMovies);
  };
  useEffect(() => {
    getUsers();
  }, []);

  const [rs, setrs] = useState({
    id: "",
    name: "",
  });
  const showDetail = (id) => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => response.json())
      .then((res) => setrs(res));
  };

  // const getDatafrom=()=>{
  //   const data =localStorage.getItem('log');
  //   if(data){
  //     return JSON.parse(data);
  //   }else{
  //     return [];
  //   }
  // }

  const handleuser = (e) => {
    e.preventDefault();
    let user = {
      name,
      email,
      password,
    };
    setLog([...log, user]);
    setName("");
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    localStorage.setItem("log", JSON.stringify(log));
  }, [log]);

  return (
    <div className="container grid">
      {movies &&
        movies.map((items, index) => {
          return (
            <>
              <div key={index} className="position-relative">
                <button
                  type="button"
                  class="btn btn-primary position-absolute end-0"
                  onClick={(e) => showDetail(items.id)}
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Book Ticket
                </button>
                <a href={items.url}>
                  <img
                    src={items.image.original}
                    style={{ width: "100%", height: "100%" }}
                    alt="movie"
                  />
                </a>

                {/* <!-- Modal --> */}
                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          <p>Movie Name : {rs.name}</p>
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <form
                          className="form-group"
                          autoComplete="off"
                          onSubmit={handleuser}
                        >
                          <div class="mb-3 row mx-3">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Name
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="name"
                              placeholder=""
                              required
                              onChange={(e) => setName(e.target.value)}
                              value={name}
                            />
                          </div>
                          <div class="mb-3 row mx-3">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Email address
                            </label>
                            <input
                              type="email"
                              class="form-control"
                              id="exampleFormControlInput1"
                              placeholder=""
                              required
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                            />
                          </div>
                          <div class="mb-3 row mx-3">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              class="form-control"
                              id="exampleFormControlInput1"
                              placeholder=""
                              required
                              onChange={(e) => setPassword(e.target.value)}
                              value={password}
                            />
                          </div>
                          <div class="modal-footer">
                            <button type="submit" class="btn btn-primary">
                              Save
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      {/* <div>
          {log.length<1 && <div>No user here</div>}
        </div> */}
    </div>
  );
};

export default MovieList;
