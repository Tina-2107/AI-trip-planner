# AI Trip Planner

An AI-powered trip planner built with **React + Vite**, **FastAPI**, and **Google Gemini**.

The application accepts a natural-language trip request, generates a structured itinerary using Gemini, validates the response, and renders the itinerary as an interactive React UI.

## Project Structure

```text
ai-trip-planner/
├── frontend/     # React + Vite frontend
└── backend/      # FastAPI backend
```

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** FastAPI
- **AI:** Google Gemini
- **Languages:** JavaScript + Python

## Architecture

The application follows this flow:

```text
                         USER
                           │
                           ↓
                     TripForm.jsx
                           │
                           │ trip prompt
                           ↓
                        api.js
                           │
                           │ POST request
                           ↓
                    FastAPI Backend
                           │
                           ↓
                    Gemini Service
                           │
                           │ structured output
                           ↓
                   Structured JSON
                           │
                           ↓
                      Validation
                           │
                    ┌──────┴──────┐
                    │             │
                  valid         invalid
                    │             │
                    ↓             ↓
                React State     Error
                    │
                    ↓
                 TripView
                    │
                    ↓
                 DayCard
                    │
                    ↓
                 StopCard
              ┌─────┼─────┐
              ↓     ↓     ↓
           Expand  Remove Reorder
```

### Component Responsibilities

| Component         | Responsibility                                                 |
| ----------------- | -------------------------------------------------------------- |
| `TripForm.jsx`    | Collects trip requirements and submits the request             |
| `api.js`          | Sends requests from React to the FastAPI backend               |
| FastAPI Backend   | Receives requests and communicates with Gemini                 |
| Gemini Service    | Generates the travel itinerary                                 |
| Structured Output | Provides a predictable itinerary format                        |
| Validation        | Ensures the generated response follows the expected structure  |
| React State       | Stores and updates the generated itinerary                     |
| `TripView.jsx`    | Renders the complete itinerary                                 |
| `DayCard.jsx`     | Renders an individual day and its stops                        |
| `StopCard.jsx`    | Renders an individual stop and provides itinerary interactions |

## Gemini Structured Output

Gemini is instructed to generate the itinerary using a predefined structured format instead of returning arbitrary text.

The generated response follows a predictable structure similar to:

```json
{
  "destination": "Goa",
  "summary": "A beach-focused trip to Goa",
  "days": [
    {
      "day": 1,
      "stops": [
        {
          "id": "goa-1",
          "name": "Baga Beach",
          "time": "10:00 AM",
          "description": "Relax and explore the beach."
        }
      ]
    }
  ]
}
```

Structured output makes it easier for the backend to validate the response and for React to render the itinerary consistently.

## API Flow

The application establishes the following complete flow:

```text
React
  ↓
FastAPI
  ↓
Gemini
  ↓
Structured JSON
  ↓
Validation
  ↓
FastAPI
  ↓
React State
  ↓
TripView
```

The React frontend sends a natural-language trip request to the FastAPI backend.

FastAPI sends the request to Gemini.

Gemini generates a structured itinerary.

The backend validates the generated response before returning it to React.

React stores the itinerary in state and renders it through the itinerary components.

## Interactive Itinerary

The generated itinerary is not only displayed as static content. Users can interact with individual itinerary stops.

### Expand

Users can expand a stop to view additional information such as its description.

```text
Stop
  ↓
Expand
  ↓
Show description
```

### Remove

Users can remove a stop from a particular day.

```text
Day
  ↓
Stop
  ↓
Remove
  ↓
React State Updated
```

### Reorder

Users can move stops up or down within the same day.

```text
Stop A
Stop B
Stop C

Move C ↑

Stop A
Stop C
Stop B
```

These interactions update the itinerary stored in React state.

## Example Request

```text
5 day trip to Goa focused on beaches
```

## Example Response

```json
{
  "destination": "Goa",
  "summary": "A five-day beach-focused itinerary",
  "days": [
    {
      "day": 1,
      "stops": [
        {
          "id": "goa-1",
          "name": "Baga Beach",
          "time": "10:00 AM",
          "description": "Relax and explore the beach."
        },
        {
          "id": "goa-2",
          "name": "Calangute Beach",
          "time": "3:00 PM",
          "description": "Spend the afternoon exploring the beach."
        }
      ]
    }
  ]
}
```

The exact itinerary varies because it is generated dynamically by Gemini.

## Validation

The backend validates the generated response before sending it to the frontend.

Expected high-level structure:

```json
{
  "destination": "string",
  "summary": "string",
  "days": []
}
```

Valid response:

```text
Gemini
   ↓
Structured JSON
   ↓
Validation
   ↓
React State
   ↓
TripView
```

Invalid response:

```text
Gemini
   ↓
Invalid Response
   ↓
Validation
   ↓
Error
```

This helps prevent unexpected AI output from breaking the frontend.

## Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd ai-trip-planner
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

### 3. Backend Setup

Open another terminal:

```bash
cd backend
python -m venv venv
```

Activate the virtual environment.

**Windows:**

```bash
venv\Scripts\activate
```

**macOS/Linux:**

```bash
source venv/bin/activate
```

Install the required dependencies:

```bash
pip install fastapi uvicorn google-genai python-dotenv
```

### 4. Configure Gemini API Key

Create a `.env` file inside `backend/`:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Never commit the `.env` file or your API key to Git.

The backend should keep the API key private and load it through an environment variable.

### 5. Start the Backend

From the `backend/` directory:

```bash
uvicorn main:app --reload
```

The API runs on:

```text
http://127.0.0.1:8000
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

## Current Milestone

- [x] Create React + Vite frontend
- [x] Create FastAPI backend
- [x] Configure Gemini API key
- [x] Connect React to FastAPI
- [x] Connect FastAPI to Gemini
- [x] Integrate Gemini structured output
- [x] Validate generated itinerary structure
- [x] Store generated itinerary in React state
- [x] Build `TripView`
- [x] Build `DayCard`
- [x] Build `StopCard`
- [x] Add expand functionality
- [x] Add remove functionality
- [x] Add stop reordering
- [ ] Improve error handling
- [ ] Add persistent itinerary storage
- [ ] Improve UI/UX
- [ ] Deploy application

## AI Usage

AI tools were used during development as a learning and productivity aid.

AI assistance was used for:

- Understanding and designing the Gemini structured-output integration
- Debugging implementation issues
- Evaluating React state-management approaches
- Improving error-handling approaches
- Reviewing and refining documentation

AI-generated suggestions were evaluated against the project's requirements and adapted where appropriate. The final implementation was manually integrated, tested, and reviewed, and I remain responsible for understanding and explaining the code and technical decisions.

## Known Limitations

- Generated itineraries depend on Gemini's output and may not always reflect real-time travel conditions.

- The application does not currently verify live opening hours, prices, availability, or transportation information.

- Itinerary modifications are currently maintained in frontend state and are not persisted.

- Error handling can be improved for API failures and unexpected responses.

- The application currently focuses on itinerary generation and basic itinerary editing rather than complete trip booking.

- The application has not yet been deployed.

## Time Spent

Approximate development time for the current milestone:

**~4.5 hours**

| Activity                          |           Time |
| --------------------------------- | -------------: |
| Learning, architecture & research |        ~1 hour |
| Backend / AI integration          |     ~1.5 hours |
| React UI & interactions           |     ~1.5 hours |
| Testing & documentation           |      ~0.5 hour |
| **Total**                         | **~4.5 hours** |

The total time includes both **learning/research and implementation**, including debugging, testing, and documentation.

## Security

The Gemini API key is kept on the backend and loaded through an environment variable.

Sensitive configuration should never be committed to Git.

Recommended ignored files include:

```text
.env
venv/
__pycache__/
node_modules/
```

## Future Improvements

Planned improvements include:

- Better API and frontend error handling
- Persistent itinerary storage
- Authentication
- Improved itinerary editing
- Real-time travel information
- Maps and location integration
- Weather information
- Budget estimation
- Deployment
