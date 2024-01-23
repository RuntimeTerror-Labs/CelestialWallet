use dep::std;

fn main(password: Field) -> pub Field {
    let hash = std::hash::poseidon::bn254::hash_1([password]);

    hash
}

#[test]
fn test_main() {
    let password : Field = 0x12345678;

    std::println(main(password));
}
