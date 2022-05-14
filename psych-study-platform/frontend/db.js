import Dexie from "dexie";

export const db = new Dexie("meshi-events");
db.version(1).stores({
  events: "++id, type, payload",
});

export async function saveEvent(type, payload) {
  return db.events.add({ type, payload });
}

async function getAllEvent() {
  return db.events.toArray();
}

async function deleteEvent(id) {
  return db.events.delete(id);
}

export async function sync() {
  for await (const event of getAllEvent()) {
    // make API call to backend
    deleteEvent(event.id);
  }
}
