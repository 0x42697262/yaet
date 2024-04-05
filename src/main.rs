use clap::{builder::PossibleValuesParser, Parser};
use std::path::PathBuf;

mod utils;

/// Command-line interface for Yet Another Encryption Tool.
///
/// Yet Another Encryption Tool!
///
/// RSA-OAEP encrypt or decrypt FILE, or standard input, to standard output.
///
/// With no FILE, or when FILE is -, read standard input.
///
///
/// This prototype tool is intended solely for educational purposes within the CMSC 134 Intro to Cyber
/// security course. It is not suitable for production use.
///
#[derive(Parser, Debug)]
#[command(
    version,
    about = "Yet Another Encryption Tool!

RSA-OAEP encrypt or decrypt FILE, or standard input, to standard output.

With no FILE, or when FILE is -, read standard input.


This prototype tool is intended solely for educational purposes within the CMSC 134 Intro to Cybersecurity course. It is not suitable for production use.",
    long_about = None
    )]
struct Cli {
    #[command(subcommand)]
    param: Params,

    /// Enable debug prints
    ///
    #[arg(long)]
    debug: bool,
}

/// Commands for different operations (Encrypt/Decrypt/Configure).
///
/// Attach `--debug` before the subcommand to output debug prints.
///
#[derive(Parser, Debug)]
enum Params {
    Decrypt(DecryptArgs),
    Encrypt(EncryptArgs),
    Generate(GenerateArgs),
}

/// Specifies the arguments necessary for encrypting a message.
///
/// When encrypting a file, the following elements are required:
///
/// - Public key of the receiver: Essential for encrypting the message securely for the intended recipient.
///
/// - Private signature: Essential for providing integrity of the message.
///
#[derive(Parser, Debug)]
#[command(about = "Encrypt a message", visible_alias = "enc")]
struct EncryptArgs {
    /// Specifies the input file containing plaintext.
    ///
    /// You can provide a file path as the input source. Alternatively, you can directly pipe the output of another command to this argument.
    ///
    #[arg()]
    file: Option<PathBuf>,

    /// The recipient's public RSA key.
    ///
    /// The public key is used to encrypt the message.
    ///
    #[arg(required = true, long, short = 'p', visible_aliases = [ "public", "key", "pkey", "pk"])]
    public_key: PathBuf,

    /// Your private key signature.
    ///
    /// The private key signature is used for authenticity and integrity of your message.
    ///
    #[arg(required = true, long, short = 's', visible_aliases = ["signature", "sig"])]
    private_key_signature: PathBuf,

    /// Output to a FILE
    ///
    /// Specify the file path for the output of the encrypted message.
    ///
    #[arg(long, short = 'o', visible_aliases = ["out"])]
    output: Option<PathBuf>,
}

/// Specifies the arguments necessary for decrypting a message.
///
/// When decrypting a file, the following elements are required:
///
/// - Private encryption key: Used to decrypt the message.
///
#[derive(Parser, Debug)]
#[command(about = "Decrypt an encrypted message", visible_alias = "dec")]
struct DecryptArgs {
    /// Specifies the input file containing ciphertext message.
    ///
    /// You can provide a file path as the input source. Alternatively, you can directly pipe the output of another command to this argument.
    ///
    ///
    /// # Example
    ///
    /// ```bash
    /// echo "Hello World" | yaet decrypt [...]
    /// ```
    ///
    /// or
    ///
    /// ```bash
    /// yaet decrypt ~/message.txt [...]
    /// ```
    ///
    #[arg()]
    file: Option<PathBuf>,

    /// Your RSA private key to decrypt the message.
    ///
    /// The private key is used to decrypt the message.
    ///
    #[arg(required = true, long, short = 'p', visible_aliases = [ "private", "key", "pkey", "pk"])]
    private_key: PathBuf,

    /// The recipient's public key signature.
    ///
    /// The public key signature is used for authenticity and integrity of the received encrypted message.
    ///
    #[arg(required = true, long, short = 's', visible_aliases = ["signature", "sig"])]
    public_key_signature: PathBuf,

    /// Output to a FILE
    ///
    /// Specify the file path for the output of the encrypted message.
    ///
    #[arg(long, short = 'o', visible_aliases = ["out"])]
    output: Option<PathBuf>,
}

/// Generate new keypairs for encryption and signing.
///
/// This flag triggers the generation of two pairs of keys: one for encryption and one for verification.
/// Each pair includes both a private and a public key.
///
#[derive(Parser, Debug)]
#[command(about = "Generate private and public keys", visible_alias = "gen")]
struct GenerateArgs {
    /// Output file
    #[arg(
        long,
        short = 'o',
        required = true,
        visible_alias = "out",
        value_name = "FILE"
    )]
    output: PathBuf,

    /// Bit size
    ///
    /// Formula: ((Bits * 8) - (66 * 8)) / 8 = maximum characters
    ///
    /// With the default 1648 bits, the maximum characters allowed as input is 140 characters:
    /// ((206*8) - (66*8)) / 8 = 140.
    ///
    #[arg(long, short = 'b', default_value = "1648", value_parser = PossibleValuesParser::new(["1024", "1648", "2048", "4096"]))]
    bits: String,
}

fn main() {
    let cli: Cli = Cli::parse();

    match cli.param {
        Params::Encrypt(args) => {
            let message: String = utils::read_input(&args.file).unwrap();
            let public_key: PathBuf = args.public_key;
            let signature: PathBuf = args.private_key_signature;
            let output: PathBuf = args.output.unwrap_or_default();

            if cli.debug {
                println!("Message: {:#?}", message);
                println!("Public key: {:#?}", public_key);
                println!("Signature: {:#?}", signature);
                println!("Output: {:#?}", output);
            }

            let raw_message: &[u8] = message.as_bytes();
            utils::generate_encrypted_message(raw_message, &public_key, &signature, &output)
                .expect("failed to encrypt message");
        }

        Params::Decrypt(args) => {
            let message: Vec<u8> = utils::read_input_raw(&args.file).unwrap();
            let private_key: PathBuf = args.private_key;
            let signature: PathBuf = args.public_key_signature;
            let output: PathBuf = args.output.unwrap_or_default();

            if cli.debug {
                println!("Message: {:?}", message);
                println!("Private key: {:#?}", private_key);
                println!("Signature: {:#?}", signature);
                println!("Output: {:#?}", output);
            }

            utils::generate_decrypted_message(&message, &private_key, &signature, &output)
                .expect("failed to encrypt message");
        }

        Params::Generate(args) => {
            let output: PathBuf = args.output;
            let bits: usize = args.bits.parse().unwrap();

            if cli.debug {
                println!("Output: {:#?}", output);
                println!("Bits: {:#?}", bits);
            }

            println!("Generating private and public RSA keys...");

            utils::generate_private_key(&output, bits).expect("failed to generate private key");
            utils::generate_public_key(&output).expect("failed to generate public key");

            println!("Saved {:?}", output.as_path());
            println!("Generating private and public signature keys...");

            let output_signature: PathBuf = utils::append_to_path(output, ".signature");
            utils::generate_private_key(&output_signature, bits)
                .expect("failed to generate private key");
            utils::generate_public_key(&output_signature).expect("failed to generate public key");

            println!("Saved {:?}", output_signature.as_path());
        }
    }
}
