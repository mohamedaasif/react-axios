import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [res, setRes] = useState("");
  const [showRes, setShowRes] = useState(false);
  const [err, setErr] = useState("");
  const [showError, setShowError] = useState(false);
  const [token, setToken] = useState("");
  const [showToken, setShowToken] = useState(false);
  const postData = {
    name: "Aasif",
    email: "aasif@gmail.com",
  };

  //* GET Request
  const getHandler = () => {
    // axios({
    //   method: "get",
    //   url: "https://jsonplaceholder.typicode.com/comments",
    //   params: {
    //     _limit: 10,
    //   },
    // })
    //   .then((res) => {
    //     setRes(res);
    //     setShowRes(true);
    //   })
    //   .catch((err) => console.log(err));

    axios
      .get("https://jsonplaceholder.typicode.com/comments?_limit=5")
      .then((res) => {
        setRes(res);
        setShowRes(true);
      })
      .catch((err) => console.log(err));
  };

  //* POST Request
  const postHandler = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/comments", postData)
      .then((res) => {
        setRes(res);
        setShowRes(true);
      })
      .catch((err) => console.log(err));
  };

  //* PUT/PATCH Request
  const putOrPatchHandler = () => {
    //* PUT method replace everything with the updated data
    //   axios
    //     .put("https://jsonplaceholder.typicode.com/comments/1",postData)
    //     .then((res) => {
    //       setRes(res);
    //       setShowRes(true);
    //     })
    //     .catch((err) => console.log(err));
    // };

    //* PATCH method only change the updated data
    axios
      .patch("https://jsonplaceholder.typicode.com/comments/1", postData)
      .then((res) => {
        setRes(res);
        setShowRes(true);
      })
      .catch((err) => console.log(err));
  };

  //* DELETE Request
  const deleteHandler = () => {
    axios
      .delete("https://jsonplaceholder.typicode.com/comments/1")
      .then((res) => {
        setRes(res);
        setShowRes(true);
      })
      .catch((err) => console.log(err));
  };

  //* SIMULTANEOUS DATA
  const simHandler = () => {
    axios
      .all([
        axios.get("https://jsonplaceholder.typicode.com/users?_limit=2"),
        axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
      ])

      //* access response by using index
      // .then((res) => {
      // setRes(res[0]);
      //   setShowRes(true);
      // })
      //* access response by spread() in axios
      .then(
        axios.spread((users, posts) => {
          setRes(posts);
          setShowRes(true);
        })
      )
      .catch((err) => console.log(err));
  };

  //* Custom Headers
  const customHandler = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "sometoken",
      },
    };

    axios
      .post("https://jsonplaceholder.typicode.com/comments", postData, config)
      .then((res) => {
        setRes(res);
        setShowRes(true);
      })
      .catch((err) => console.log(err));
  };

  //* Transform Request & Response
  const transformHandler = () => {
    const options = {
      method: "post",
      url: "https://jsonplaceholder.typicode.com/todos",
      data: {
        title: "Hello from axios",
      },
      transformResponse: axios.defaults.transformResponse.concat((data) => {
        data.title = data.title.toUpperCase();
        return data;
      }),
    };

    axios(options).then((res) => {
      setRes(res);
      setShowRes(true);
    });
  };

  //* ERROR Handling
  const errorHandler = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/commentss")
      .then((res) => {
        setRes(res);
        setShowRes(true);
      })
      .catch((err) => {
        if (err.response) {
          setErr(err.response);
          setShowError(true);
        }
      });
  };

  //* Cancel token
  const cancelHandler = () => {
    const source = axios.CancelToken.source();
    // console.log(source);
    axios
      .get("https://jsonplaceholder.typicode.com/todos", {
        cancelToken: source.token,
      })
      .then((res) => {
        setRes(res);
        setShowRes(true);
      })
      .catch((thrown) => {
        if (axios.isCancel(thrown)) {
          setToken(thrown.message);
          setShowToken(true);
        }
      });

    if (true) {
      source.cancel("Request canceled!");
    }
  };

  return (
    <div className="App">
      <div className="container my-5">
        <div className="text-center">
          <h1 className="display-4 text-center mb-3">Axios Using React</h1>
          <button className="btn btn-primary my-3" onClick={getHandler}>
            GET
          </button>
          <button className="btn btn-info" onClick={postHandler}>
            POST
          </button>
          <button className="btn btn-warning" onClick={putOrPatchHandler}>
            PUT/PATCH
          </button>
          <button className="btn btn-danger" onClick={deleteHandler}>
            DELETE
          </button>
          <button className="btn btn-secondary" onClick={simHandler}>
            Sim Requests
          </button>
          <button className="btn btn-secondary" onClick={customHandler}>
            Custom Headers
          </button>
          <button className="btn btn-secondary" onClick={transformHandler}>
            Transform
          </button>
          <button className="btn btn-secondary" onClick={errorHandler}>
            Error Handling
          </button>
          <button className="btn btn-secondary" onClick={cancelHandler}>
            Cancel
          </button>
        </div>
        {showRes ? (
          <div>
            <div className="card card-body mb-4">
              <h5>Status: {res.status}</h5>
            </div>
            <div className="card mt-3">
              <div className="card-header">Headers</div>
              <div className="card-body">
                <pre>{JSON.stringify(res.headers, null, 2)}</pre>
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-header">Data</div>
              <div className="card-body">
                <pre>{JSON.stringify(res.data, null, 2)}</pre>
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-header">Config</div>
              <div className="card-body">
                <pre>{JSON.stringify(res.config, null, 2)}</pre>
              </div>
            </div>
          </div>
        ) : null}

        {showError ? (
          <div>
            <div className="card card-body mb-4">
              <h3 style={{ color: "red", textAlign: "center" }}>
                {`${err.status} PAGE NOT FOUND`}
              </h3>
            </div>
          </div>
        ) : null}

        {showToken ? (
          <div>
            <div className="card card-body mb-4">
              <h3 style={{ color: "red", textAlign: "center" }}>{token}</h3>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
