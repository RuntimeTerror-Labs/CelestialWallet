use dep::std;

fn main(password: Field, password_hash: pub Field, nonce: u8, use_nonce: pub u8) {
    assert(use_nonce == nonce);

    let hash = std::hash::poseidon::bn254::hash_1([password]);

    assert(hash == password_hash);
}

#[test]
fn test_main() {
    let password : Field = 0x12345678;
    let password_hash : Field = 0x091ee5332166a8f64710423d58d89cb39991be009823f7f2fa9e1869fb6df51c;
    let nonce : u8 = 0x12;
    let use_nonce : u8 = 0x12;

    main(password, password_hash, nonce, use_nonce);
}
