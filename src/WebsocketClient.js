// import WebSocket from "ws"
import WSClient from "isomorphic-ws"

class WebSocketClient {
    
    constructor(url) {
        this.instance = new WSClient(url)
        this.isOpen = false
        
        this.instance.onopen = () => {
            this.instance.send("This is a test message from the web control panel")
            console.log("connected")
        }

        this.instance.onmessage = (message) => {
            console.log(message.data)
        }
    }

    IsConnected() {
        if(isNaN(this.instance)) {
            return false
        }
        if(this.instance === null) {
            return false
        }

        return this.instance.readyState === WebSocket.OPEN
    }
    
    Connect(url) {
        // if(this.instance === null) {
        //     this.instance = new WSClient(url)
        // }

        // if(this.instance.readyState === WebSocket.CLOSED) {
        //     this.instance.Connect(`ws://${url}`)
        // }
    }

    Disconnect() {
        if(!this.IsConnected) {
            return
        }
        this.instance.close()
    }

    async Send(message) {
        
        try {
            if(!this.IsConnected) {
                throw new Error("Websocket Client is not connected")
            }
            
            this.instance?.send(message)

        } catch (e) {
            console.error(e.message)
        }
    }
}

const URL = "ws://localhost:5000/"
const client = new WebSocketClient(URL)

export default client