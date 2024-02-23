import md5 from 'md5'

class Api {

  private _url: string
  private _password: string

  constructor(baseUrl: string, password: string) {
    this._url = baseUrl;
    this._password = password;
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

  _checkServerResponse(res: Response) {
    if(res.ok) {
      return res.json();
      } else {
        return res.text().then(text => { throw new Error(text) })
    }}

  getIds(): Promise<Response> {
    return fetch(`${this._url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': `${this._getHash()}`,
      },
      body: JSON.stringify({
        "action": "get_ids",    
        "params": {"offset": 0, "limit": 51}     
      })
    })
    .then(this._checkServerResponse)
  }

  getItems(ids): Promise<Response> {
    return fetch(`${this._url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': `${this._getHash()}`,
      },
      body: JSON.stringify({
        "action": "get_items",
        "params": {"ids": ids}       
      })
    })
    .then(this._checkServerResponse)
  }
}

export const api = new Api('http://api.valantis.store:40000', 'Valantis');

