"use client";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduk() {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    await fetch("http://localhost:3001/products", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    });
    setIsMutating(false);
    setTitle("");
    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn" onClick={handleChange}>
        Add new
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <div className="font-bold text-lg">Add new product</div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <label className="label font-bold text-right">Nama Produk</label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Nama Produk"
                id="product-name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              ) : (
                <button type="submit" className="btn loading">
                  Saving...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
