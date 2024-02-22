import md5 from 'md5'

class Api {

  private _url: string
  private _password: string

  constructor(baseUrl: string, password: string) {
    this._url = baseUrl;
    this._password = password
  }

  _getHash(): string {
    const today = new Date();
    const year = today.getUTCFullYear().toString();
    const month = ((today.getUTCMonth() + 1).toString().length === 1) ? `0${(today.getUTCMonth() + 1)}` : `${(today.getUTCMonth() + 1)}`;
    const day = ((today.getUTCDate()).toString().length === 1) ? `0${today.getUTCDate()}` : `${today.getUTCDate()}`;
    const timeStamp = year + month + day;
    const hash = md5(`${this._password}_${timeStamp}`); 
    return hash
  }

  getIds(): Promise {
    return fetch(`${this._url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': `${this._getHash()}`,
      },
      body: JSON.stringify({
          "action": "get_ids",
          "params": {"offset": 10, "limit": 3}         
      })
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
  }

  /* postTodo(todo: TodoTypes): Promise<TodoTypes> {
    return fetch(`${this._url}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo)})
      .then((res) => {
        if(res.ok) {
          return res.json();
          } else {
            return Promise.reject(`Ошибка: ${res.status}`);
          }
      })
  }


  deleteTodo(todoId: number): Promise<TodoTypes> {
    return fetch(`${this._url}/todos/${todoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      })
      .then((res) => {
        if(res.ok) {
          return res.json();
          } else {
            return Promise.reject(`Ошибка: ${res.status}`);
          }
      })
  }

  updateTodo(todo: TodoTypes): Promise<TodoTypes>  {
    return fetch(`${this._url}/todos/${todo._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: todo.name,
        description: todo.description,
        status: todo.status,
    })})
    .then((res) => {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
  } */
}

export const api = new Api('http://api.valantis.store:40000', 'Valantis');

