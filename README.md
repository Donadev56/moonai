# Eternal Protocol Bot

This project is a Telegram bot developed using the **grammy** framework. Its primary goal is to provide user interaction while enabling them to explore and interact with the Eternal Protocol.

---

## Features

### 1. User Management
- **User Registration**: When a user sends a message, their information is stored in a local database.
- **User Data Retrieval**: The bot checks if user data exists before proceeding.

### 2. AI-Powered Communication
- User messages are sent to an AI model (\`ollama\`) to generate personalized responses based on a detailed prompt.

### 3. Database Management
- A local database is used to store user information in JSON format.
- A temporary save mechanism ensures data reliability during updates.

---

## Main Files

### \`index.js\`
- Contains the bot's core logic.
- **Command \`/start\`**: Welcomes users with a greeting message.
- Handles user messages by passing them to the AI model for generated responses.

### \`user.js\`
- **Functions**:
  - \`SaveUserData(chatId, userData)\`: Saves user data to the database.
  - \`GetUserData(chatId)\`: Retrieves user data from the database.

### \`chat.js\`
- Integrates the AI model through the \`ChatWithModel\` function.
- Manages user conversations with structured messages and tailored responses.

### \`messageManager.js\`
- A \`MessageManager\` class is used to handle messages efficiently:
  - Saves initial system messages and user data.
  - Updates message lists for each user to maintain conversation context.

---

## AI Prompt

The bot uses a detailed prompt to guide the AI model for generating logical and friendly responses. The prompt introduces the **Eternal Protocol**, a blockchain-based ecosystem, and explains its first project, **Moon BNB**, including its reward structure, global pool mechanics, and other features.

---

## Getting Started

### Prerequisites
- Node.js
- Telegram bot token
- Local environment setup

### Installation
1. Clone this repository.
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

### Run the Bot
\`\`\`bash
node index.js
\`\`\`

---

## Future Enhancements
- Support for multiple languages.
- Improved error handling for database operations.
- Enhanced AI response customization based on user preferences.

---

## License
This project is licensed under the MIT License.