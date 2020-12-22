import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../components/Layout'

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isValidated: false }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error))
  }

  render() {
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
            <label class="block">
  <span class="text-gray-700">Name</span>
  <input class="form-input mt-1 block w-full" placeholder="Jane Doe"/>
</label>

<div class="mt-4">
  <span class="text-gray-700">Account Type</span>
  <div class="mt-2">
    <label class="inline-flex items-center">
      <input type="radio" class="form-radio" name="accountType" value="personal"/>
      <span class="ml-2">Personal</span>
    </label>
    <label class="inline-flex items-center ml-6">
      <input type="radio" class="form-radio" name="accountType" value="busines"/>
      <span class="ml-2">Business</span>
    </label>
  </div>
</div>

<label class="block mt-4">
  <span class="text-gray-700">Requested Limit</span>
  <select class="form-select mt-1 block w-full">
    <option>$1,000</option>
    <option>$5,000</option>
    <option>$10,000</option>
    <option>$25,000</option>
  </select>
</label>

<div class="flex mt-6">
  <label class="flex items-center">
    <input type="checkbox" class="form-checkbox"/ >
    <span class="ml-2">I agree to the <span class="underline">privacy policy</span></span>
  </label>
</div>

<div class="block">
  <span class="text-gray-700">Checkboxes</span>
  <div class="mt-2">
    <div>
      <label class="inline-flex items-center">
        <input type="checkbox" class="form-checkbox" checked />
        <span class="ml-2">Option 1</span>
      </label>
    </div>
    <div>
      <label class="inline-flex items-center">
        <input type="checkbox" class="form-checkbox" />
        <span class="ml-2">Option 2</span>
      </label>
    </div>
    <div>
      <label class="inline-flex items-center">
        <input type="checkbox" class="form-checkbox" />
        <span class="ml-2">Option 3</span>
      </label>
    </div>
  </div>
</div>
              <h1>Contact</h1>
              <form
                name="contact"
                method="post"
                action="/contact/thanks/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={this.handleSubmit}
              >
                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="contact" />
                <div hidden>
                  <label>
                    Don’t fill this out:{' '}
                    <input name="bot-field" onChange={this.handleChange} />
                  </label>
                </div>
                <div className="field">
                  <label className="text-gray-500 label" htmlFor={'name'}>
                    Your name
                  </label>
                  <div className="control">
                    <input
                      className="block w-full mt-1 border border-gray-500 input form-input"
                      type={'text'}
                      name={'name'}
                      onChange={this.handleChange}
                      id={'name'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'email'}>
                    Email
                  </label>
                  <div className="control">
                    <input
                      className="block w-full mt-1 form-input"
                      type={'email'}
                      name={'email'}
                      onChange={this.handleChange}
                      id={'email'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'message'}>
                    Message
                  </label>
                  <div className="control">
                    <textarea
                      className="block w-full mt-1 form-textarea"
                      name={'message'}
                      onChange={this.handleChange}
                      id={'message'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <button className="button is-link" type="submit">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
