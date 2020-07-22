import React from 'react'
import { Button } from '../_shared/button';

export const NewsLetterForm = (props) => {
  return (
    <>
     <input id="contact_tags" name="contact[tags]" type="hidden" value="prospect,newsletter" />
      <table>
        <tbody>
          <tr>
            <h1>We're still building our Shop!</h1>
          </tr>
          <tr>
            <td>
              Enter your email and we will let you know when we are ready to ship orders.
            </td>
          </tr>
          <tr>
            <br />
          </tr>
          <tr>
            <td>
              <input id="contact_email" name="contact[email]" type="text" />
              <input class="submit" type="submit" />
            </td>
          </tr>
          <tr>
            <td>
              <Button type="cancel" animated onClick={props.cancel}>CLOSE</Button>
            {/* </td> */}
            {/* <td> */}
              <Button type="submit" animated onClick={props.cancel}>SUBMIT</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
