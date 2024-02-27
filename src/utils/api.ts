import md5 from 'md5'
import { Items } from '../types/Types';

interface GetIdsResponse extends Response {
  result: string[];
}

interface GetItemsResponse extends Response {
  result: Items[];
}

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

  getIds(): Promise<GetIdsResponse> {
    return fetch(`${this._url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': `${this._getHash()}`,
      },
      body: JSON.stringify({
        "action": "get_ids",    
        "params": {"offset": 0, "limit": 500}  
      })
    })
    .then(this._checkServerResponse)
  }

  getItems(ids: string[]): Promise<GetItemsResponse> {
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

export const api = new Api('https://api.valantis.store:41000/', 'Valantis');

