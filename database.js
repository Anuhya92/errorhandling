export function createReservation(data, callback) {
  setTimeout(() => {
    const error =
      Math.random() > 0.5
        ? "Datebase error: Failed to create reservation"
        : null;
    if (error) {
      callback(error, null);
    } else {
      callback(null, { id: Date.now(), ...data });
    }
  }, 1000);
}

export function getReservation(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const error =
        Math.random() > 0.5
          ? "Datebase error: Failed to get reservation"
          : null;

      if (id == 2) {
        resolve({ message: "Successfully retrieved reservation with id 2" });
      }
      if (error) {
        reject(error, null);
      } else {
        resolve(null, { id: id, message: "Successfully retried from db" });
      }
    }, 1000);
  });
}
